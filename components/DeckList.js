import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Title from './Title';
import Deck from './Deck';
import { white } from '../helpers/colors';
import * as API from '../helpers/api';

export default class DeckList extends React.Component {
  state = {
    decks: {}
  }

  componentDidMount() {
    API.getDecks().then(res => this.setState({ decks: JSON.parse(res) }))
  }

  render() {
    console.log(this.state)
    return (
      <View style={styles.mainContainer}>
        <Title style={styles.MainTitle}>Seus Decks</Title>
        {Object.keys(this.state.decks).map(deck =>
          (<Deck key={deck} deck={this.state.decks[deck]} navigation={this.props.navigation} />)
        )}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: white,
  },
  MainTitle: {
    fontSize: 24,
    marginTop: 30,
    marginBottom: 30,
  }
})