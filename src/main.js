const { app, BrowserWindow, ipcMain } = require('electron')
const path = require('path')
const { exec } = require('child_process')

function createWindow() {
  const win = new BrowserWindow({
    width: 1280,
    height: 720,
    minWidth: 800,
    minHeight: 600,
    frame: false,
    backgroundColor: '#0f0f0f',
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false
    }
  })

  win.loadFile(path.join(__dirname, 'index.html'))
}

// Window controls
ipcMain.on('window-minimize', (e) => BrowserWindow.fromWebContents(e.sender).minimize())
ipcMain.on('window-maximize', (e) => {
  const win = BrowserWindow.fromWebContents(e.sender)
  win.isMaximized() ? win.unmaximize() : win.maximize()
})
ipcMain.on('window-close', (e) => BrowserWindow.fromWebContents(e.sender).close())

// Launch Minecraft (placeholder - expand this later)
ipcMain.on('launch-game', (e, version) => {
  console.log(`Launching Minecraft ${version}...`)
  // TODO: add actual java launch command here
  e.sender.send('game-launched', version)
})

app.whenReady().then(createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})
