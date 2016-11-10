/**
 * Created by budde on 21/10/2016.
 */

const connect = require('react-redux').connect
const Timer = require('../views/timer.jsx')

const mapStateToProps = ({cardId, user}) => {
  return {cardId, user}
}

module.exports = connect(mapStateToProps)(Timer)
