import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import * as API from './helpers/api';

export default class App extends React.Component {

  componentDidMount() {
    API.initDeck()
      .then(() => { return API.getDecks() })
      .then(() => { return API.saveDeckTitle('Probono') })
      .then(() => { return API.getDecks() })
      .then(res => console.log(JSON.parse(res)))
      .then(() => { return API.getDeck('Probono') })
      .then(res => console.log(res))
      .then(() => API.addCardToDeck('Probono', { question: 'who?', answer: 'me' }))
      .then(() => { return API.getDecks() })
      .then(res => console.log(JSON.parse(res)))
      .then(() => API.addCardToDeck('JavaScript', { question: 'who?2', answer: 'me2' }))
      .then(() => { return API.getDecks() })
      .then(res => console.log(JSON.parse(res)))
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>Open up App.js to start working on your app!</Text>
        <Text>Changes you make will automatically reload.</Text>
        <Text>Shake your phone to open the developer menu.</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
