const electron = require('electron')
const app = electron.app
const BrowserWindow = electron.BrowserWindow
const { nfc } = require('nfc')
const { sendAction, actions: { updateCardId } } = require('./redux')

let mainWindow

var device = new nfc.NFC()

device.on('read', ({ uid }) => sendAction(mainWindow, updateCardId(uid)))
device.on('error', err => console.error(err))

try {
  device.start()
} catch (err) {
  console.error('Couldn\'t start Till: ', err)
  return app.quit()
}

function createWindow () {
  mainWindow = new BrowserWindow({
    titleBarStyle: 'hidden',
    backgroundColor: '#66D3D3',
    width: 400,
    height: 600
  })

  mainWindow.loadURL(`file://${__dirname}/index.html`)

  mainWindow.webContents.openDevTools()

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
