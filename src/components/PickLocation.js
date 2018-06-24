import React, {Component} from 'react';
import {View,Text,StyleSheet, Button, ScrollView, Image, Dimensions, Platform} from 'react-native';
import {MapView} from 'expo';
import MapsView from 'react-native-maps';

export default class PickLocation extends Component {

  state = {
    focusedLocation: {
      latitude: 36.072790,
      longitude: 139.098754,
      latitudeDelta: 0.0139,
      longitudeDelta: Dimensions.get('window').width / Dimensions.get('window').height * 0.02
    },
    locationChosen: false
  }

  pickLocationHandler = (event, pos) => {

    const coords = pos === undefined ? event.nativeEvent.coordinate : pos.coords;

    this.map.animateToRegion({
      ...this.state.focusedLocation,
      latitude: coords.latitude,
      longitude: coords.longitude
    });
    this.setState(previousState => {
      return {
        focusedLocation: {
          ...previousState.focusedLocation,
          latitude: coords.latitude,
          longitude: coords.longitude
        },
        locationChosen: true
      }
    });

    this.props.onLocationPick({
      latitude: coords.latitude,
      longitude: coords.longitude
    });
  }

  getLocationHandler = () => {
    navigator.geolocation.getCurrentPosition(pos => {
      this.pickLocationHandler(null, pos);
    }, err => {
      console.log("err ", err);
      alert("Error! Pick location manually");
    });
  }


  render () {
    let marker = null;
    if(this.state.locationChosen) {
      marker = (<MapView.Marker coordinate={this.state.focusedLocation}/>);
    }

    if(Platform.OS === 'android') {
      return (
        <View style={[styles.container, {height: 180}]}>

          <View style={styles.mapContainer}>
          <MapView
            initialRegion={this.state.focusedLocation}
            style={styles.mapAndroid}
            onPress={this.pickLocationHandler}
            ref={ref => this.map = ref}
            >
            {marker}
          </MapView>
          </View>

          <View style={styles.button}>
            <Button title="Locate Me" onPress={this.getLocationHandler}/>
          </View>

        </View>
      );
    } else {
      return (
        <View style={styles.container}>

          <MapsView
            initialRegion={this.state.focusedLocation}
            style={styles.mapIos}
            onPress={this.pickLocationHandler}
            ref={ref => this.map = ref}
            >
            {marker}
          </MapsView>

          <View style={styles.button}>
            <Button title="Locate Me" onPress={this.getLocationHandler}/>
          </View>

        </View>
      );
    }
  }
}


const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center'
  },
  button: {
    margin: 8
  },
  mapAndroid: {
    width: "100%",
    height: '100%'
  },
  mapIos: {
    width: '100%',
    height: '60%'
  },
  mapContainer: {
    width: '100%',
    height: '60%'
  }
});
