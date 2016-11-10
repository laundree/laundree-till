/**
 * Created by budde on 21/10/2016.
 */

const connect = require('react-redux').connect
const TopBar = require('../views/top-bar.jsx')

const mapStateToProps = ({error, user}) => {
  return {error, user}
}

module.exports = connect(mapStateToProps)(TopBar)
