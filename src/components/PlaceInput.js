import React, { Component } from "react";
import { View, TextInput, Button, StyleSheet } from "react-native";
import {Actions} from 'react-native-router-flux';

const PlaceInput = props => (
        <TextInput
          placeholder="  Place name"
          value={props.placeName}
          onChangeText={props.onChangeText}
          style={styles.placeInput}
        />);

const styles = StyleSheet.create({
  inputContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center"
  },
  placeInput: {
    borderBottomWidth: 3,
    borderColor: '#1F3A93',
    marginBottom: 15,
    backgroundColor: '#fff',
    width: '100%',
    height: 43
  },
  placeButton: {
    width: "30%"
  }
});

export default PlaceInput;
