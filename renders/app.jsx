const React = require('react')
const ReactDOM = require('react-dom')
const { App } = require('../react/connectors')
const { Provider } = require('react-redux')
const { setupStore } = require('../redux')

function setupReact (rootElement) {
  const store = setupStore()
  ReactDOM.render(<Provider store={store}><App /></Provider>, rootElement)
}

module.exports = setupReact
