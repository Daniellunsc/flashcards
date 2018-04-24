import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import Title from './Title';
import Deck from './Deck';
import { white } from '../helpers/colors';
import * as API from '../helpers/api';
import { receiveDecks } from '../actions';
import { connect } from 'react-redux';


class DeckList extends React.Component {
  componentDidMount() {
    API.getDecks().then(res => this.props.defineDecks(res))
  }

  renderItem = ({ item }) => {
    return Object.keys(item).map(item => <Deck key={item} deck={this.props.decks[item]} navigation={this.props.navigation} />)
  }

  render() {
    if (!this.props.decks) {
      return (
        <View style={styles.mainContainer}>
          <Title style={styles.MainTitle}>No Decks</Title>
        </View>
      )
    }

    return (
      <View style={styles.mainContainer}>
        <Title style={styles.MainTitle}>Seus Decks</Title>
        <FlatList
          data={[this.props.decks]}
          renderItem={this.renderItem}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: white,
  },
  MainTitle: {
    alignSelf: 'center',
    fontSize: 24,
    marginTop: 30,
    marginBottom: 30,
  }
})

function MapStateToProps(state) {
  return {
    decks: state.decks,
  }
}

function MapDispatchToProps(dispatch) {
  return {
    defineDecks: (decks) => dispatch(receiveDecks(decks))
  }
}

export default connect(MapStateToProps, MapDispatchToProps)(DeckList)