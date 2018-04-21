import { AsyncStorage } from 'react-native'

const DECK_KEY = 'FLASHCARDS:DECKS';


export function initDeck() {
  const INITIAL_DECK = {
    React: {
      title: 'React',
      questions: [
        {
          question: 'What is React?',
          answer: 'A library for managing user interfaces'
        },
        {
          question: 'Where do you make Ajax requests in React?',
          answer: 'The componentDidMount lifecycle event'
        }
      ]
    },
    JavaScript: {
      title: 'JavaScript',
      questions: [
        {
          question: 'What is a closure?',
          answer: 'The combination of a function and the lexical environment within which that function was declared.'
        }
      ]
    }
  }

  return AsyncStorage.getItem(DECK_KEY)
    .then(result => {
      const data = JSON.parse(result);
      if (data == undefined) {
        return AsyncStorage.setItem(DECK_KEY, JSON.stringify(INITIAL_DECK));
      }
      return AsyncStorage.removeItem(DECK_KEY)
        .then(AsyncStorage.setItem(DECK_KEY, JSON.stringify(INITIAL_DECK)))
    }
    )
}

export function getDecks() {
  return AsyncStorage.getItem(DECK_KEY);
}

export function getDeck(id) {
  return AsyncStorage.getItem(DECK_KEY)
    .then(data => {
      return JSON.parse(data)[id]
    })
}

export function saveDeckTitle(title) {
  const newDeck = {
    [title]: {
      title: title,
      questions: [],
    }
  }

  return AsyncStorage.mergeItem(DECK_KEY, JSON.stringify(newDeck))
}

export function addCardToDeck(title, { answer, question }) {
  return AsyncStorage.getItem(DECK_KEY)
    .then(data => {
      const decks = JSON.parse(data)
      decks[title].questions.push({ answer, question })
      return AsyncStorage.mergeItem(DECK_KEY, JSON.stringify({
        [title]: {
          title: title,
          questions: decks[title].questions
        }
      }))
    })
}