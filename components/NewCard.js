import React from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import Title from './Title';
import { red, white, redDarker } from '../helpers/colors';
import { connect } from 'react-redux'
import { addCardToDeck } from '../actions/index';
import * as API from '../helpers/api';

class NewCard extends React.Component {

  static navigationOptions = ({ navigation }) => {
    const { id } = navigation.state.params
    return {
      title: 'Adicionar nova pergunta'
    }
  }

  state = {
    answer: '',
    question: ''
  }

  submitCard = () => {
    const { id } = this.props.navigation.state.params
    if (this.state.answer && this.state.question) {
      if(this.state.answer.trim() == 0 || this.state.question.trim() == 0){
        alert('Apenas espaços em brancos não são permitidos!');
        return;
      }
      
      card = {
        answer: this.state.answer,
        question: this.state.question,
      }
      API.addCardToDeck(id, card)
        .then(() => this.props.saveCard(id, card))
        .then(() => alert('Card Salvo com sucesso'))
        .then(() => this.props.navigation.goBack())
    } else {
      alert('Verifique se não deixou nenhum campo em branco!');
    }

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

        <TouchableOpacity style={styles.BtnStyle} onPress={() => this.submitCard()}>
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

function mapDispatchToProps(dispatch) {
  return {
    saveCard: (id, card) => dispatch(addCardToDeck(id, card))
  }
}

export default connect(null, mapDispatchToProps)(NewCard);