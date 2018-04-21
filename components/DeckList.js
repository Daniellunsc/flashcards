import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Title from './Title';
import Deck from './Deck';

export default class DeckList extends React.Component {
  render() {
    return (
      <View style={styles.mainContainer}>
        <Title style={styles.MainTitle}>Seus Decks</Title>
        <Deck />
        <Deck />
        <Deck />
        <Deck />
        <Deck />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    alignItems: 'center'
  },
  MainTitle: {
    fontSize: 24,
    marginTop: 30,
  }
})