const electron = require('electron')
const app = electron.app
const BrowserWindow = electron.BrowserWindow
const { nfc } = require('nfc')
const { sendAction, actions: { updateCardId } } = require('./redux')
const defaultConfig = require('./config/default.json')
let localConfig
try {
  localConfig = require('./config/local.json')
} catch (err) {
  localConfig = {}
}

const config = Object.assign(defaultConfig, localConfig)

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
    kiosk: config.kiosk,
    width: 800,
    height: 480
  })

  mainWindow.loadURL(`file://${__dirname}/index.html`)

  if (config.showDevTools) mainWindow.webContents.openDevTools()

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
