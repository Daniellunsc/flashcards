import React from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import Title from './Title';
import { red, white, redDarker } from '../helpers/colors';
import * as API from '../helpers/api';
import { connect } from 'react-redux';
import { addDeck } from '../actions';

class NewDeck extends React.Component {

  state = {
    deckName: null
  }

  componentDidMount() {
    console.log(this.props)
  }

  submitDeck = () => {
    const { deckName } = this.state;

    const DeckStructure = {
      [deckName]: {
        title: deckName,
        questions: []
      }
    }

    if (deckName != null) {
      API.saveDeckTitle(deckName)
        .then(() => this.props.addDeckInStore(DeckStructure))
        .then(() => alert('Deck adicionado com sucesso'))
        .then(this.props.navigation.navigate('DeckDetails', { id: deckName }))
    } else {
      alert('O nome do deck não pode estar em branco')
    }
  }

  render() {
    const { deckName } = this.state
    return (
      <View style={styles.AddDeck}>
        <Title style={styles.AddDeckTitle}>Qual o nome do seu novo Deck?</Title>
        <TextInput
          placeholder="Nome do seu novo Deck"
          style={styles.InputStyle}
          onChangeText={(deckName) => this.setState({ deckName })}
          value={deckName}
        />
        <TouchableOpacity style={styles.BtnStyle} onPress={() => this.submitDeck()}>
          <Text style={styles.BtnText}>Adicionar</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  AddDeck: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: white,
  },
  AddDeckTitle: {
    fontSize: 24,
    marginBottom: 20,
  },
  BtnStyle: {
    marginTop: 20,
    backgroundColor: red,
    padding: 10,
    paddingLeft: 50,
    paddingRight: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 25,
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

function mapDispatchToProps(dispatch) {
  return {
    addDeckInStore: (deck) => dispatch(addDeck(deck))
  }
}

export default connect(null, mapDispatchToProps)(NewDeck)