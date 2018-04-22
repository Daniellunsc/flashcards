import React from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, StatusBar, ActivityIndicator } from 'react-native';
import Title from './Title';
import { red, white, redDarker, gray, blue } from '../helpers/colors';
import * as API from '../helpers/api';
import { connect } from 'react-redux';

class DeckDetails extends React.Component {

  static navigationOptions = ({ navigation }) => {
    const { id } = navigation.state.params
    return {
      title: id
    }
  }

  state = {
    deck: '',
    loading: true,
  }

  componentDidMount() {
    const { id } = this.props.navigation.state.params
    API.getDeck(id)
      .then(res => this.setState({ loading: false }))
  }

  render() {
    const { loading } = this.state
    const { deck } = this.props
    if (loading) {
      return (
        <View style={styles.DeckDetails}>
          <ActivityIndicator />
        </View>
      )
    }

    return (
      <View style={styles.DeckDetails}>
        <Title style={styles.DeckTitle}>{deck.title}</Title>
        <Text style={styles.DeckSubTitle}>{deck.questions.length} cards</Text>
        <TouchableOpacity style={styles.BtnStyle} onPress={() => this.props.navigation.navigate(
          'NewCard', { id: deck.title }
        )}>
          <Text style={styles.BtnText}>Adicionar Card</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.BtnStyle, styles.BtnQuizStyle]} onPress={() => this.props.navigation.navigate(
          'Quiz', { id: deck.title }
        )}>
          <Text style={styles.BtnText}>Iniciar Quiz</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  DeckDetails: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: white,
  },
  DeckTitle: {
    fontSize: 28,
    marginBottom: 20,
  },
  DeckSubTitle: {
    fontSize: 18,
    marginBottom: 20,
    color: gray,
  },
  BtnStyle: {
    marginTop: 20,
    backgroundColor: red,
    padding: 10,
    width: '60%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 25,
  },

  BtnQuizStyle: {
    backgroundColor: blue,
  },

  BtnText: {
    fontSize: 14,
    color: white,
  },
  InputStyle: {
    padding: 10,
    height: 40,
    width: '80%',
    borderColor: red,
    color: redDarker,
    borderRadius: 25,
    borderWidth: 0.5,
  }
})

function mapStateToProps(state, props) {
  const { id } = props.navigation.state.params
  const deck = state.decks[id]
  return {
    deck,
  }
}

export default connect(mapStateToProps)(DeckDetails)