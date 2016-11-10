/**
 * Created by budde on 21/10/2016.
 */

const connect = require('react-redux').connect
const App = require('../views/app.jsx')

const mapStateToProps = ({user}) => {
  return {user}
}

module.exports = connect(mapStateToProps)(App)
