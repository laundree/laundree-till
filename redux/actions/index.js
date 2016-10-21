/**
 * Created by budde on 05/06/16.
 */
const { createAction } = require('redux-actions')

const UPDATE_CARD_ID = 'UPDATE_CARD_ID'

module.exports = {
  types: { UPDATE_CARD_ID },
  updateCardId: createAction(UPDATE_CARD_ID)
}
