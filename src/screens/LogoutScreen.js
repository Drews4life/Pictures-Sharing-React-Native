import React, {Component} from 'react';
import {View, Text, Modal, TouchableOpacity, StyleSheet} from 'react-native';
import {Actions} from 'react-native-router-flux';

export default class LogoutScreen extends Component {

  logOutHandler = () => {
    Actions.LoginBoard({type: 'reset'});
  }

  render () {
    return (
      <View style={styles.container}>
        <Text style={styles.headerText}> Are you sure you want to log out?</Text>
        <TouchableOpacity  style={[styles.btnContainer, {marginTop: 35}]}
        onPress={this.logOutHandler}>
          <Text style={[styles.btnText, {color: 'red'}]}>Yes</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  headerText: {
    fontSize: 23,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  btnText: {
    fontSize: 20,
    fontWeight: 'bold'
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  btnContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '30%',
    height: '10%',
    marginBottom: 25,
    backgroundColor: '#fff',
    borderWidth: 3,
    borderColor: '#1F3A93',
    borderRadius: 45
  }
});
