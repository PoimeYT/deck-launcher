const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('launcher', {
  launch: (profile) => ipcRenderer.invoke('launch-minecraft', profile),
  close: () => ipcRenderer.send('close-app'),
  minimize: () => ipcRenderer.send('minimize-app')
})
