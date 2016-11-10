/**
 * Created by budde on 05/06/16.
 */
const { createAction } = require('redux-actions')

const UPDATE_CARD_ID = 'UPDATE_CARD_ID'
const UPDATE_ERROR = 'UPDATE_ERROR'
const UPDATE_USER = 'UPDATE_USER'

module.exports = {
  types: { UPDATE_CARD_ID, UPDATE_ERROR, UPDATE_USER },
  updateCardId: createAction(UPDATE_CARD_ID),
  updateError: createAction(UPDATE_ERROR, err => err.message),
  updateUser: createAction(UPDATE_USER)
}
