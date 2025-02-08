const { app, globalShortcut, BrowserWindow, systemPreferences } = require('electron');
const debug = require('electron-debug');
const electron = require('electron');
const data = require('./data.json');

if(!app.isPackaged) {
  try {
    require('electron-reloader')(module);
  } catch {}
}

const createWindow = async () => {
  const win = new BrowserWindow({
    title: "devola2",
    width: 1200,
    height: 800,
    icon: __dirname + '/assets/favicon.ico',
    fullscreen: true,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      enableRemoteModule: true,
    }
  });

  await win.loadFile('src/loading.html');

  await systemPreferences.askForMediaAccess("microphone");
  await systemPreferences.askForMediaAccess("camera");

  await win.webContents.executeJavaScript(`sessionStorage.setItem('data', '${JSON.stringify(data)}')`)

  await win.loadFile('src/orange-ui.html');

  // if dev
  win.webContents.openDevTools();
}

app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
});
