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
import firebase from 'firebase';
import Icon from './src/assets/tab.png';
import configureStore from './src/store';
import Router from './src/Router';


export default class App extends React.Component {

  componentWillMount() {
      var config = {
        apiKey: "AIzaSyAtBagM48sBL-6tu7TFq-GhhJWBlUAmI_E",
        authDomain: "shareplaces-208010.firebaseapp.com",
        databaseURL: "https://shareplaces-208010.firebaseio.com",
        projectId: "shareplaces-208010",
        storageBucket: "shareplaces-208010.appspot.com",
        messagingSenderId: "453176072012"
      };
    firebase.initializeApp(config);
  }

  render() {
    return (
    <Provider store={configureStore()}>
        <Router/>
    </Provider>
    );
  }
}
