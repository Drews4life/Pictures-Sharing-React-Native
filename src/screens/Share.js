import React, {Component} from 'react';
import {View,Text, StyleSheet, TextInput, Button, ScrollView, Image, ActivityIndicator} from 'react-native';
import {connect} from 'react-redux';
import PlaceInput from '../components/PlaceInput';
import PickImage from '../components/PickImage';
import PickLocation from '../components/PickLocation';
import {addPlace} from '../actions';
import validate from '../utility/validation';


class Share extends Component {
  state = {
    controls: {
      placeName: {
        value: '',
        valid: false,
        touched: false,
        validationRules: {
          notEmpty: false
        }
      },
      location: {
        value: null,
        valid: false
      },
      image: {
        value: null,
        valid: false
      }
    }
  }

  placeNameChangedHandler = val => {
    this.setState(prevState => {
      return {
        controls: {
          ...prevState.controls,
          placeName: {
            ...prevState.controls.placeName,
            value: val,
            valid: validate(val, prevState.controls.placeName.validationRules),
            touched: true
          }
        }
      };
    });
  }

  onAddPlaceHandler = () => {
    const {placeName, location, image} = this.state.controls;
    this.props.onAddPlace(placeName.value, location.value, image.value);
  }

  imagePickerHandler = image => {
    this.setState(previousState => {
      return {
        controls: {
          ...previousState.controls,
          image: {
            value: image,
            valid: true
          }
        }
      };
    });
  }

  locationPickerHandler = location => {
    this.setState(previousState => {
      return {
        controls: {
          ...previousState.controls,
          location: {
            value: location,
            valid: true
          }
        }
      };
    });
  }

  isLoadingHandler = () => {
    const {placeName, location, image} = this.state.controls;
    if(this.props.isLoading) {
      return (
        <ActivityIndicator
          color={'blue'}
          size={'large'}
          />
      );
    } else {
      return (
        <Button
          title="Share the place!"
          onPress={this.onAddPlaceHandler}
          disabled={!placeName.valid || !location.valid || !image.valid}
          />
      );
    }
  }

  render() {
    const {placeName, location, image} = this.state.controls;
    return (
      <ScrollView>
        <View style={styles.container}>
          <Text style={styles.textHeader}>Share a place with us</Text>
          <PlaceInput onChangeText={this.placeNameChangedHandler} placeName={placeName.value}/>
          <View style={styles.button}>

            {this.isLoadingHandler()}

          </View>
          <PickImage onImagePicked={this.imagePickerHandler}/>
          <PickLocation onLocationPick={this.locationPickerHandler}/>
        </View>
      </ScrollView>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center"
  },
  button: {
    margin: 8
  },
  previewImage: {
    width: "100%",
    height: "100%"
  },
  placeholder: {
    borderWidth: 1,
    borderColor: "black",
    backgroundColor: "#eee",
    width: "80%",
    height: 150
  },
  textHeader: {
    fontWeight: 'bold',
    fontSize: 28,
    textAlign: 'center',
    marginTop: 30
  }
});

mapStateToProps = state => {
  return {
    isLoading: state.ui.isLoading
  }
};

const mapDispatchToProps = dispatch => {
  return {
    onAddPlace: (placeName, location, image) => dispatch(addPlace(placeName, location, image))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Share);
