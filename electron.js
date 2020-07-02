const { app, BrowserWindow, ipcMain } = require('electron');
const notifier = require('node-notifier');


function createWindow () {
  // Create the browser window.
  let win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true
    }
  })

  // and load the index.html of the app.
  win.loadFile('dist/index.html')
}

ipcMain.on('notify', function(event, message) {
  notifier.notify({
    title: "Reminder",
    message: message
  });
})

app.whenReady().then(createWindow)

