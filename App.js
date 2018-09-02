import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { HomeStationView, WorkStationView } from "./views"
import { createStackNavigator } from 'react-navigation';
import { Font } from "expo"


const Sway = createStackNavigator(
  {
    HomeStationView: {
      screen: HomeStationView,
      navigationOptions: {
        header: null
      }
    },
    WorkStationView: {
      screen: WorkStationView,
      navigationOptions: {
        header: null
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
      'Merriweather': require("./assets/Merriweather.otf"),
      'Merriweather-Bold': require("./assets/Merriweather-Bold.otf"),
    });
    this.setState({ fontLoaded: true })
  }
  render() {
    return this.state.fontLoaded && (
      <React.Fragment>
        <Sway />
      </React.Fragment>
    )
  }
}