const { app, BrowserWindow, ipcMain, Tray, Menu, screen } = require('electron');
const notifier = require('node-notifier');
const path = require('path');

let window = null;

function createWindow () {
  // Create the browser window.
  const {width, height} = screen.getPrimaryDisplay().workAreaSize;
  window = new BrowserWindow({
    width: width / 2,
    height: height / 2,
    webPreferences: {
      nodeIntegration: true
    }
  });

  window.removeMenu();

  window.on('minimise', e => {
    e.preventDefault();
    window.hide();
  });

  window.on('close', e => {
    e.preventDefault();
    window.hide();
  })
  // and load the index.html of the app.
  window.loadFile('dist/index.html')
}

ipcMain.on('notify', function(event, message) {
  notifier.notify({
    title: "Reminder",
    message: message
  });
})

app.on('ready', () => {
  tray = new Tray('public/icon.jpg');
  const contextMenu = Menu.buildFromTemplate([
    {label: 'Show', click: () => {
      window.show();
    }},
    {label: 'Quit', click: () => {
      window.destroy();
      app.quit();
    }}
  ])
  tray.setToolTip('Reminder App');
  tray.setContextMenu(contextMenu);
})
app.whenReady().then(createWindow)

