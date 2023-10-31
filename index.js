const { app, globalShortcut, BrowserWindow, systemPreferences } = require('electron');
const debug = require('electron-debug');
const electron = require('electron');

try {
	require('electron-reloader')(module);
} catch {}

debug();

const createWindow = () => {
  const win = new BrowserWindow({
    title: "Devola2",
    width: 1200,
    height: 800,
    icon: __dirname + '/assets/favicon.ico',
    fullscreen: true,
    // webPreferences: {
    //   nodeIntegration: true,
    //   contextIsolation: false,
    //   enableRemoteModule: true
    // }
  });

  win.loadFile('index.html');
  systemPreferences.askForMediaAccess("microphone");
}

app.whenReady().then(() => {
  createWindow(); 
  
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
});
