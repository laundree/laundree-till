const React = require('react')
const IntroDialog = require('../connectors/intro-dialog')
const TopBar = require('./top-bar.jsx')

const App = () => <div>
  <TopBar/>
  <IntroDialog/>
</div>

module.exports = App
