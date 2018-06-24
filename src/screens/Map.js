import React, {Component} from 'react';
import {View,Text,StyleSheet, TouchableOpacity, Animated} from 'react-native';
import {connect} from 'react-redux';
import {Actions} from 'react-native-router-flux';
import PlaceList from '../components/PlaceList';
import {getPlaces} from '../actions';

class Map extends Component {

  state = {
    placesLoaded: false,
    removeAnim: new Animated.Value(1),
    placesAnim: new Animated.Value(0)
  };

  componentDidMount () {
    console.log('placesLoaded: ' + this.state.placesLoaded);
    this.props.onGetPlaces();
  }

  itemSelectedHandler = key => {
    Actions.DetailsTab({
      selectedPlace: this.props.places.find(place => {
        return place.key === key;
      })
    });
  };


  placesLoadedHandler = () => {
    Animated.timing(this.state.removeAnim, {
      toValue: 0,
      duration: 500,
      useNativeDriver: true
    }).start();
  }

  placesSearchHandler = () => {
    this.setState({
      placesLoaded: true
    });
    this.placesLoadedHandler();
  };

  render() {
    let content = (
      <Animated.View style={[styles.btnContainer,{
          opacity: this.state.removeAnim,
          transform: [
            {
              scale: this.state.removeAnim.interpolate({
                inputRange: [0, 1],
                outputRange: [3, 1]
              })
            }
          ]
        }]}>
        <TouchableOpacity onPress={this.placesSearchHandler}>
          <Text style={styles.txtBtnContainer}>Find Places</Text>
        </TouchableOpacity>
      </Animated.View>
    );

    if(this.state.placesLoaded) {
      content = (
          <PlaceList places={this.props.places} onItemSelected={this.itemSelectedHandler}/>
      );
    }
    return (
      <View style={styles.mainContainer}>
        {content}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  btnContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '40%',
    height: '7%',
    marginBottom: 25,
    backgroundColor: '#fff',
    borderWidth: 3,
    borderColor: '#1F3A93',
    borderRadius: 45,
    alignSelf: 'center'
  },
  txtBtnContainer: {
    fontSize: 20,
    fontWeight: 'bold'
  },
  container: {
    flex: 3
  },
  mainContainer: {
    alignItems: 'center',
    flex: 1,
    marginTop: 25,
    justifyContent: 'center'
  }
});

const mapStateToProps = state => {
  return {
    places: state.places.places
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onGetPlaces: () => dispatch(getPlaces())
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Map);
