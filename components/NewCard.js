import React from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import Title from './Title';
import { red, white, redDarker } from '../helpers/colors';

export default class NewCard extends React.Component {

  state = {
    answer: '',
    question: ''
  }

  render() {
    const { answer, question } = this.state
    return (
      <View style={styles.AddDeck}>
        <Title style={styles.AddDeckTitle}>Qual a pergunta a ser adicionada?</Title>

        <TextInput
          placeholder="Pergunta"
          style={styles.InputStyle}
          onChangeText={(question) => this.setState({ question })}
          value={question}
        />

        <TextInput
          placeholder="Resposta"
          style={styles.InputStyle}
          onChangeText={(answer) => this.setState({ answer })}
          value={answer}
        />

        <TouchableOpacity style={styles.BtnStyle} onPress={() => alert(`${question}:${answer}`)}>
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
    marginTop: 10,
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
    marginBottom: 10,
    width: '80%',
    borderColor: red,
    color: redDarker,
    borderRadius: 25,
    borderWidth: 0.5,
  }
})