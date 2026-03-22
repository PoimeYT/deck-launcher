const { app, BrowserWindow, ipcMain } = require('electron')
const path = require('path')
const { execFile } = require('child_process')

function createWindow() {
  const win = new BrowserWindow({
    width: 1280,
    height: 720,
    frame: false,
    backgroundColor: '#0f0f0f',
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false
    }
  })

  win.loadFile('index.html')
}

// Handle launching Minecraft (placeholder)
ipcMain.handle('launch-minecraft', async (event, profile) => {
  console.log(`Launching profile: ${profile.name}`)
  // TODO: add actual java launch command here
  return { success: true }
})

ipcMain.on('close-app', () => app.quit())
ipcMain.on('minimize-app', (event) => {
  BrowserWindow.fromWebContents(event.sender).minimize()
})

app.whenReady().then(createWindow)
app.on('window-all-closed', () => app.quit())
