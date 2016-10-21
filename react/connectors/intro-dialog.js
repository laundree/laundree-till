/**
 * Created by budde on 21/10/2016.
 */

const connect = require('react-redux').connect
const IntroDialog = require('../views/intro-dialog.jsx')

const mapStateToProps = ({cardId}) => {
  return {cardId}
}

module.exports = connect(mapStateToProps)(IntroDialog)
