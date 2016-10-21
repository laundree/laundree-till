/**
 * Created by budde on 21/10/2016.
 */

const reducer = require('./reducer')
const { createStore } = require('redux')
const debug = require('debug')('laundree.till.redux')
function sendAction (window, action) {
  debug(`Sending action ${action.type}`, action.payload)
  window.webContents.send('action', action)
}

function setupStore () {
  const { ipcRenderer } = require('electron')
  const store = createStore(reducer)
  ipcRenderer.on('action', (event, action) => {
    store.dispatch(action)
  })
  return store
}

module.exports = {
  sendAction,
  setupStore,
  actions: require('./actions')
}
