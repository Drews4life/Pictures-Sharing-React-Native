import React from 'react';
import {TouchableOpacity, Text, StyleSheet} from 'react-native';


const RoundButton = props => (
  <TouchableOpacity
    {...props}
    style={[styles.btnLogin, props.styleBtn, !props.disabled ? null : styles.disabled]}
    activeOpacity={props.disabled ? 1 : 0.5}
    onPress={props.disabled ? () => console.log('') : props.Method} >
      <Text
        style={[styles.loginTxt, props.styleTxt, !props.disabled ? null : styles.disabledTxt]}
        >
        {props.children}
      </Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  loginTxt: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1F3A93',
    textAlign: 'center',
  },
  btnLogin: {
    height: 55,
    width: '40%',
    backgroundColor: '#C8F7C5',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 15,
    borderWidth: 3,
    borderColor: '#1F3A93',
    borderRadius: 50
  },
  disabled: {
    backgroundColor: '#eee',
    borderColor: '#aaa'
  },
  disabledTxt: {
    color: '#aaa'
  }
});

export default RoundButton;
