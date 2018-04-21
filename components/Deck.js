import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { gray, white } from '../helpers/colors'
import Title from './Title';

export default class Deck extends React.Component {
  render() {
    return (
      <View style={styles.boxDeck}>
        <Title style={styles.deckTitle}>Deck Name</Title>
        <Text style={styles.infoDeck}> 3 cards </Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  boxDeck: {
    width: '80%',
    backgroundColor: white,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
    borderRadius: 16,
    padding: 10,
    shadowRadius: 3,
    shadowOpacity: 0.8,
    shadowColor: 'rgba(0,0,0,0.24)',
    shadowOffset: {
      width: 0,
      height: 3,
    }
  },
  deckTitle: {
    fontSize: 16,
  },
  infoDeck: {
    fontSize: 12,
    color: gray
  }
})
