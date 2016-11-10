/**
 * Created by budde on 10/11/2016.
 */
const { BrowserWindow, ipcMain } = require('electron')
const config = require('../config')
const EventEmitter = require('events')
const { sendAction, actions: { updateCardId, updateError, updateUser } } = require('./../redux')
const { Sdk } = require('laundree-sdk')
const sdk = new Sdk(config.laundree.address)
const debug = require('debug')('laundree.till.handlers.window')
let Gpio
try {
  Gpio = require('onoff').Gpio
} catch (err) {
  debug('Could not start Gpio, got error', err)
  Gpio = null
}

class UserHandler {
  static findUserFromCard (uuid) {
    const email = config.users[ uuid ]
    if (!email) return Promise.reject(new Error('User not found'))
    debug('Got email ' + email)
    return sdk.user
      .fromEmail(email)
      .then(({ id }) => {
        debug('Got user id ' + id)
        return sdk.user(id).get()
      })
      .then(user => {
        debug('Got user ' + user)
        return user
      })
  }
}

class WindowHandler extends EventEmitter {

  constructor (window) {
    super()
    this._window = window
  }

  static createWindow (nfcDevice) {
    const window = new BrowserWindow({
      frame: false,
      backgroundColor: '#66D3D3',
      kiosk: config.kiosk,
      width: 800,
      height: 480
    })
    const handler = new WindowHandler(window, nfcDevice)
    window.loadURL(`file://${__dirname}/../index.html`)
    window.on('closed', () => handler.emit('closed'))
    handler.setupNfcDevice(nfcDevice)
    handler.setupGpio()
    return handler
  }

  setupGpio () {
    if (!Gpio) return
    const led = new Gpio(17, 'out')
    ipcMain.on('timer-start', () => {
      debug('Received timer start')
      led.write(1)
    })
    ipcMain.on('timer-stop', () => {
      debug('Received timer stop')
      led.write(0)
    })
  }

  setupNfcDevice (nfcDevice) {
    let findingUser = false
    nfcDevice.on('read', ({ uid }) => {
      if (findingUser) return
      findingUser = true
      sendAction(this._window, updateCardId(uid))
      UserHandler
        .findUserFromCard(uid)
        .then(user => sendAction(this._window, updateUser(user)))
        .catch(err => sendAction(this._window, updateError(err)))
        .then(() => {
          findingUser = false
        })
    })
    nfcDevice.on('error', err => console.error(err))
  }
}

module.exports = WindowHandler
