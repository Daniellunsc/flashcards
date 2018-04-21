import React from 'react';
import { StyleSheet, Text, View, StatusBar } from 'react-native';
import * as API from './helpers/api';
import DeckList from './components/DeckList';
import { TabNavigator } from 'react-navigation';
import { Constants } from 'expo';
import { FontAwesome, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { red, white } from './helpers/colors';

function UdaciStatusBar({ backgroundColor, ...props }) {
  return (
    <View style={{ backgroundColor, height: Constants.statusBarHeight }}>
      <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
  )
}

const Tabs = TabNavigator({
  Decks: {
    screen: DeckList,
    navigationOptions: {
      tabBarLabel: 'Decks',
      tabBarIcon: ({ tintColor }) => <MaterialCommunityIcons name='cards' size={30} color={red} />
    }
  },
}, {
    navigationOptions: {
      header: null,
    },
    tabBarOptions: {
      activeTintColor: red,
      style: {
        height: 56,
        backgroundColor: white,
        shadowColor: 'rgba(0,0,0, 0.24)',
        shadowOffset: {
          width: 0,
          height: 3
        },
        shadowRadius: 6,
        shadowOpacity: 1
      }

    }
  })

export default class App extends React.Component {

  componentDidMount() {
    API.initDeck()
      .then(() => { return API.getDecks() })
      .then(() => { return API.saveDeckTitle('Probono') })
      .then(() => { return API.getDecks() })
      .then(res => console.log(JSON.parse(res)))
      .then(() => { return API.getDeck('Probono') })
      .then(res => console.log(res))
      .then(() => API.addCardToDeck('Probono', { question: 'who?', answer: 'me' }))
      .then(() => { return API.getDecks() })
      .then(res => console.log(JSON.parse(res)))
      .then(() => API.addCardToDeck('JavaScript', { question: 'who?2', answer: 'me2' }))
      .then(() => { return API.getDecks() })
      .then(res => console.log(JSON.parse(res)))
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <UdaciStatusBar backgroundColor={'#DC493A'} barStyle='light-content' />
        <Tabs />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
