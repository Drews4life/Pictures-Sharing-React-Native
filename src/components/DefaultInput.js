import React from 'react';
import {TextInput, StyleSheet} from 'react-native';

const DefaultInput = props => (
  <TextInput
    {...props}
    style={[styles.inputStyle, props.InputStyle, !props.valid && props.touched ? styles.invalid : null]}
    underlineColorAndroid="transparent"/>
);

const styles = StyleSheet.create({
  inputStyle: {
    borderWidth: 3,
    borderColor: '#1F3A93',
    borderRadius: 15,
    marginBottom: 15,
    backgroundColor: '#fff',
    width: '100%',
    height: 43
  },
  invalid: {
    backgroundColor: '#f9c0c0',
    borderColor: 'red'
  }
});

export default DefaultInput;
