const electron = require('electron')
const app = electron.app
const { nfc } = require('nfc')
const WindowHandler = require('./handlers/window')

let mainWindow

const device = new nfc.NFC()

try {
  device.start()
} catch (err) {
  console.error('Couldn\'t start Till: ', err)
  // return app.quit()
}

function createWindow () {
  mainWindow = WindowHandler.createWindow(device)
  mainWindow.on('closed', function () {
    mainWindow = null
  })
}

app.on('ready', createWindow)

app.on('window-all-closed', () => {
  if (process.platform === 'darwin') return
  app.quit()
})

app.on('activate', () => {
  if (mainWindow !== null) return
  createWindow()
})

app.on('quit', () => device.stop())
