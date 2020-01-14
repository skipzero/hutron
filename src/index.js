const path = require('path');
const url = require('url');
const v3 = require('node-hue-api').v3;

const { BrowserWindow, ipcMain, app, Menu, Tray } = require('electron');

let mainWindow;
let appIcon = null;

async function getBridge() {
  const results = await v3.discovery.nupnpSearch();
  return JSON.stringify(results);
}

function createWindow() {
  debugger;
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true
    }
  });

  console.log('App', app)

  // and load the index.html of the app.
  mainWindow.loadUrl('index.html');
  const data = getBridge();
  console.log('Data::', data);
  mainWindow.on('closed', () => {
    mainWindow = null;
  });

  mainWindow.webContents.openDevTools()
}

app.on('ready', () => {
  createWindow();
});

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (appIcon) {
    appIcon.destroy();
  }

  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow();
  }
});


// ipcMain.on('ready', (event) => {
//   const iconName = process.platform === 'win32' ? 'windows-icon.png' : 'iconTemplate.png';
//   const iconPath = path.join(__dirname, iconName);
//   console.log(iconPath)
//   appIcon = new Tray(iconPath);
//
//   const contextMenu = Menu.buildFromTemplate([{
//     label: 'Remove',
//     click: () => {
//       event.sender.send('tray-removed')
//     }
//   }])
//
//   appIcon.setToolTip('electron logo in tray!');
//   appIcon.setContextMenu(contextMenu);
// })

ipcMain.on('remove-tray', () => {
  appIcon.destroy();
});
