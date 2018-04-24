import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import Title from './Title';
import { red, blue, white } from '../helpers/colors'
import { connect } from 'react-redux';
import { clearLocalNotification, setNotification } from '../helpers/helpers';

class Quiz extends React.Component {
  state = {
    cardIndex: 0,
    right: 0,
    wrong: 0,
    showAnswer: false,
  }

  AdvanceQuiz = () => {
    this.setState({
      cardIndex: this.state.cardIndex + 1,
      showAnswer: false,
    })
  }

  toggleAnswer = () => {
    this.setState({
      showAnswer: !this.state.showAnswer
    })
  }

  markAnswer = (value) => {
    if (value === 1) this.setState({ right: this.state.right + 1 });
    else if (value === -1) this.setState({ wrong: this.state.wrong + 1 });
    this.AdvanceQuiz();
  }

  setDefault = () => {
    this.setState({
      cardIndex: 0,
      right: 0,
      wrong: 0,
      showAnswer: false,
    })
  }

  completeQuiz = () => {
    const { deck } = this.props;
    const { cardIndex } = this.state;
    if (deck.questions.length == cardIndex) {
      clearLocalNotification().then(() => setNotification)
      return alert('Quiz concluido!');
    }
  }

  render() {

    const { deck } = this.props;
    const { cardIndex, showAnswer, right, wrong } = this.state;

    if (!deck) {
      return <ActivityIndicator />
    }

    if (deck.questions.length > cardIndex) {
      return (
        <View style={styles.mainView}>
          <Title style={styles.question}>
            {
              showAnswer ?
                deck.questions[cardIndex].answer
                :
                deck.questions[cardIndex].question
            }
          </Title>
          <TouchableOpacity onPress={() => this.toggleAnswer()}>
            <Text>
              {
                showAnswer ?
                  'Mostrar pergunta'
                  :
                  'Mostrar resposta'
              }
            </Text>
          </TouchableOpacity>
          <Text style={{ margin: 15 }}>{`${cardIndex}/${deck.questions.length} respondidos`}</Text>
          {
            showAnswer ?
              <View style={styles.btnView}>
                <TouchableOpacity style={[styles.Btn, styles.correctBtn]} onPress={() => this.markAnswer(1)}>
                  <Text style={styles.BtnText}>Certo</Text>
                </TouchableOpacity>

                <TouchableOpacity style={[styles.Btn, styles.incorrectBtn]} onPress={() => this.markAnswer(-1)}>
                  <Text style={styles.BtnText}>Errado</Text>
                </TouchableOpacity>
              </View>
              :
              null
          }
        </View>
      )
    }
    return (
      <View style={styles.mainView}>
        {this.completeQuiz()}
        <Title style={styles.question}>
          Quiz Finalizado!
        </Title>
        <Text style={styles.text}>
          Certos: {`${parseFloat((right * 100) / deck.questions.length).toFixed(1)} % `}
        </Text>
        <Text style={styles.text}>
          Errados: {`${parseFloat((wrong * 100) / deck.questions.length).toFixed(1)} % `}
        </Text>

        <TouchableOpacity style={[styles.Btn, styles.correctBtn]} onPress={() => this.setDefault()}>
          <Text style={styles.BtnText}>Reiniciar Quiz</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.Btn, styles.incorrectBtn]} onPress={() => this.props.navigation.goBack()}>
          <Text style={styles.BtnText}>Voltar ao baralho</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: white,

  },
  btnView: {
    marginTop: 60,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  question: {
    fontSize: 36,
    margin: 20,
  },
  Btn: {
    height: 30,
    width: '60%',
    alignItems: 'center',
    justifyContent: 'center',

    borderRadius: 25,
    margin: 10,
  },
  BtnText: {
    color: 'white',
  },
  correctBtn: {
    backgroundColor: blue,
  },
  incorrectBtn: {
    backgroundColor: red,
  },
  text: {
    fontSize: 20,
    margin: 5,
  }

})

function mapStateToProps(state, props) {
  const { id } = props.navigation.state.params
  const deck = state.decks[id]
  return {
    deck,
  }
}

export default connect(mapStateToProps)(Quiz);