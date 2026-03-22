const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('launcher', {
  minimize: () => ipcRenderer.send('window-minimize'),
  maximize: () => ipcRenderer.send('window-maximize'),
  close: () => ipcRenderer.send('window-close'),
  launch: (version) => ipcRenderer.send('launch-game', version),
  onGameLaunched: (cb) => ipcRenderer.on('game-launched', (_, v) => cb(v))
})
