const { app, globalShortcut, BrowserWindow, systemPreferences } = require('electron');
const debug = require('electron-debug');
const electron = require('electron');
const { Dualsense } = require("dualsense-ts");

try {
	require('electron-reloader')(module);
} catch {}

debug();

// Grab a controller connected via USB or Bluetooth
const controller = new Dualsense();

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

  const connected = controller.connection.active;
  controller.connection.on("change", ({ active }) => {
    console.log(`controller ${active ? '' : 'dis'}connected`)
  });
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
