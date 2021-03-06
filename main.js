const electron = require("electron");
const BrowserWindow = electron.BrowserWindow;
const app = electron.app;

app.on("window-all-closed", function() {
  if (process.platform != "darwin") {
    app.quit();
  }
});

app.on("ready", function() {
  mainWindow = new BrowserWindow({ width: 1360, height: 800 });

  mainWindow.loadURL("http://localhost:8080/built/index.html");

  mainWindow.on("closed", function() {
    mainWindow = null;
  });
});
