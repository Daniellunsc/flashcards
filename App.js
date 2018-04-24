import React from 'react';
import { StyleSheet, Text, View, StatusBar } from 'react-native';
import * as API from './helpers/api';
import DeckList from './components/DeckList';
import NewDeck from './components/NewDeck';
import DeckDetails from './components/DeckDetails';
import NewCard from './components/NewCard';
import Quiz from './components/Quiz';
import { TabNavigator, StackNavigator } from 'react-navigation';
import { Constants, AppLoading } from 'expo';
import { FontAwesome, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { red, white } from './helpers/colors';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducer from './reducer';
import { clearLocalNotification, setNotification } from './helpers/helpers';

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
  NewDeck: {
    screen: NewDeck,
    navigationOptions: {
      tabBarLabel: 'Adicionar Deck',
      tabBarIcon: ({ tintColor }) => <Ionicons name='ios-add-circle' size={30} color={red} />
    }
  }
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

const MainNavigator = StackNavigator({
  Home: {
    screen: Tabs,
  },

  DeckDetails: {
    screen: DeckDetails,
    navigationOptions: {
      headerTintColor: white,
      headerStyle: {
        backgroundColor: red,
        marginTop: -20,
      }
    }
  },

  NewCard: {
    screen: NewCard,
    navigationOptions: {
      headerTintColor: white,
      headerStyle: {
        backgroundColor: red,
        marginTop: -20,
      }
    }
  },

  Quiz: {
    screen: Quiz,
    navigationOptions: {
      headerTintColor: white,
      title: 'Quiz',
      headerStyle: {
        backgroundColor: red,
        marginTop: -20,
      }
    }
  }
})

export default class App extends React.Component {
  state = {
    loading: true,
  }
  componentDidMount() {
    setNotification()
    API.initDeck().then(this.setState({ loading: false }))
  }

  render() {
    const { loading } = this.state;
    if (loading) {
      return (
        <AppLoading />
      )
    }

    return (
      <Provider store={createStore(reducer)}>
        <View style={{ flex: 1 }}>
          <UdaciStatusBar backgroundColor={'#DC493A'} barStyle='light-content' />
          <MainNavigator />
        </View>
      </Provider>

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
