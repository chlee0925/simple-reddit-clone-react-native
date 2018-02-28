import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { StackNavigator } from 'react-navigation';
import { TopicListScreen } from './components/topiclist/topiclist.js';

const RootStack = StackNavigator (
  {
    Home: {
      screen: TopicListScreen,
    },
  },
  {
    initialRouteName: 'Home',
  }
);

export default class App extends React.Component {
  render() {
    return (
      <RootStack />
    );
  }
}