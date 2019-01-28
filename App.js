import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { HomeStationView, WorkStationView, HomeStationSearchView, LandingView } from "./src/views"
import { createStackNavigator } from 'react-navigation';
import { Font } from "expo"


import { Provider } from 'react-redux';
import { createStore } from 'redux';
import userReducer from './src/reducer';

const store = createStore(userReducer)

const Sway = createStackNavigator(
  {
    HomeStationView: {
      screen: HomeStationView,
      navigationOptions: {
        header: null,
        gesturesEnabled: false
      }
    },
    WorkStationView: {
      screen: WorkStationView,
      navigationOptions: {
        header: null,
        gesturesEnabled: false
      }
    },
    LandingView: {
      screen: LandingView,
      navigationOptions: {
        header: null,
        gesturesEnabled: false
      }
    }
  },
);

export default class SwapApp extends Component {
  constructor() {
    super()
    this.state = {
      fontLoaded: false
    }
  }
  componentDidMount = async () => {
    await Font.loadAsync({
      'Merriweather': require("./src/assets/Merriweather.otf"),
      'Merriweather-Bold': require("./src/assets/Merriweather-Bold.otf"),
      "Roboto-Light": require("./src/assets/Roboto-Light.ttf"),
      "Roboto": require("./src/assets/Roboto.ttf"),
      "Roboto-Black": require("./src/assets/Roboto-Black.ttf"),
    });
    this.setState({ fontLoaded: true })
  }
  render() {
    return this.state.fontLoaded && (
      <Provider store={store}>
        <Sway />
      </Provider>
    )
  }
}