import React, {Component} from 'react';
import {Modal, View, Image, Text, Button, StyleSheet, TouchableOpacity, Dimensions} from 'react-native';
import {connect} from 'react-redux';
import {MapView} from 'expo';
import Icon from 'react-native-vector-icons/Ionicons';
import {Actions} from 'react-native-router-flux';
import {deletePlace} from '../actions';

class PlaceDetail extends Component {

  onItemDeleteHandler = () => {
    this.props.onDeleteItem(this.props.selectedPlace.key);
    Actions.tabber({type: 'reset'});
  }

  render () {
    return (
      <View style={styles.modalContainer}>
        <View style={styles.mapContainer}>
          <MapView
            initialRegion={{
              ...this.props.selectedPlace.location,
              latitudeDelta: 0.0139,
              longitudeDelta:
                Dimensions.get("window").width /
                Dimensions.get("window").height *
                0.02
            }}
            style={styles.map}
          >
            <MapView.Marker coordinate={this.props.selectedPlace.location} />
          </MapView>
        </View>

        <View style={styles.imageContainer}>
          <Text style={styles.placeName}>{this.props.selectedPlace.value}</Text>
          <Image style={styles.picsStyle} source={this.props.selectedPlace.image}/>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity
             onPress={this.onItemDeleteHandler}
             >
             <Icon size={50} name="ios-trash" color="red"/>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1
  },
  picsStyle: {
    width: '100%',
    height: '100%'
  },
  map: {
    width: "100%",
    height: '100%'
  },
  placeName: {
    fontWeight: 'bold',
    fontSize: 28,
    textAlign: 'center',
    color: '#34495E'
  },
  imageContainer: {
    height: '40%'
  },
  mapContainer: {
    height: '40%',
    paddingTop: 85
  },
  buttonContainer: {
    paddingTop: 5,
    alignItems: 'center',
    justifyContent: 'center',
    height: '8%'
  }
});

const mapDispatchToProps = dispatch => {
  return {
    onDeleteItem: (key) => dispatch(deletePlace(key))
  };
};

export default connect(null, mapDispatchToProps)(PlaceDetail);
