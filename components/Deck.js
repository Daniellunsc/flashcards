import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { gray, white, skin, red } from '../helpers/colors'
import Title from './Title';

export default class Deck extends React.Component {

  componentDidMount() {
    console.log(this.props)
  }

  render() {
    return (
      <TouchableOpacity style={styles.boxDeck} onPress={() => this.props.navigation.navigate(
        'DeckDetails', { id: this.props.deck.title }
      )}>
        <View style={styles.box}>
          <Title style={styles.deckTitle}>{this.props.deck.title}</Title>
          <Text style={styles.infoDeck}>{this.props.deck.questions.length} cards</Text>
        </View>
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  boxDeck: {
    width: '80%',
    backgroundColor: skin,
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
  box: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  deckTitle: {
    fontSize: 16,
    alignItems: 'center',
  },
  infoDeck: {
    fontSize: 12,
    color: gray
  }
})
