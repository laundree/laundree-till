const React = require('react')
const IntroDialog = require('../connectors/intro-dialog')
const Timer = require('../connectors/timer')
const TopBar = require('../connectors/top-bar')

const App = ({ user }) => {
  console.log(user)
  return <div>
    <TopBar/>
    {user
      ? <Timer />
      : <IntroDialog/>}

  </div>
}

App.propTypes = {
  user: React.PropTypes.object
}
module.exports = App
