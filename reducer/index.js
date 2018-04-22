import { RECEIVE_DECKS, ADD_DECK, ADD_CARD_TO_DECK } from '../actions'

function decks(state = {}, action) {
  switch (action.type) {

    case RECEIVE_DECKS:
      return {
        ...state,
        decks: action.decks,
      }

    case ADD_DECK:
      return {
        ...state,
        decks: {
          ...state.decks,
          ...action.deck,
        }
      }

    case ADD_CARD_TO_DECK:
      return {
        ...state,
        decks: {
          ...state.decks,
          [action.id]: {
            title: action.id,
            questions: [
              ...state.decks[action.id].questions,
              {
                ...action.card
              }
            ]
          }
        }
      }

    default:
      return state;
  }
}

export default decks;