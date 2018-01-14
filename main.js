const electron = require('electron');
const BrowserWindow = electron.BrowserWindow;
const app = electron.app;

app.on('window-all-closed', function() {
  if (process.platform != 'darwin') {
    app.quit();
  }
});

app.on('ready', function() {
  mainWindow = new BrowserWindow({width: 1360, height: 800});

  mainWindow.loadURL('file://' + __dirname + '/dist/index.html');

  mainWindow.on('closed', function() {
    mainWindow = null;
  });
});
