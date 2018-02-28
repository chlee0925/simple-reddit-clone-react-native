import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { StackNavigator } from 'react-navigation';
import { TopicListScreen } from './components/topiclist/topiclist.js';
import { CreateTopicScreen } from './components/createtopic/createtopic.js'

const RootStack = StackNavigator (
  {
    Home: {
      screen: TopicListScreen,
    },
    CreateTopic: {
      screen: CreateTopicScreen
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