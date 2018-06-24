import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  ScrollView,
  FlatList,
  Image,
  TouchableOpacity
} from 'react-native';
import {Provider, connect} from 'react-redux';
import Icon from './src/assets/tab.png';
import configureStore from './src/store';
import Router from './src/Router';

export default class App extends React.Component {
  render() {
    return (
    <Provider store={configureStore()}>
        <Router/>
    </Provider>
    );
  }
}
