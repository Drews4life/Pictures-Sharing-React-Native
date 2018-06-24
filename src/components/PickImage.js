import React, {Component} from 'react';
import {View,Text,StyleSheet, Button, ScrollView, Image, Platform} from 'react-native';
import {ImagePicker} from 'expo';


export default class PickImage extends Component {

  state = {
    pickedImage: null
  }

  pickImageTest = () => {

  }


  pickImageHandler = async(info) => {
      if(Platform.OS === 'ios') {
        const { Permissions } = Expo;
        const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
          if (status === 'granted') {
            this.imageTakingLogic(info);
        }
      } else {
        this.imageTakingLogic(info);
    }
}

  imageTakingLogic = (rule) => {
    if(rule === 'take') {
      ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
      base64: true
    }).then(res => {
      this.setState({ pickedImage: {uri: res.uri} });
      this.props.onImagePicked({uri: res.uri, base64: res.base64});
    }).catch((e) => console.log('error ' + e));
  } else {
    ImagePicker.launchImageLibraryAsync({
    allowsEditing: true,
    aspect: [4, 3],
    base64: true
  }).then(res => {
    this.setState({ pickedImage: {uri: res.uri} });
    this.props.onImagePicked({uri: res.uri, base64: res.base64});
  }).catch((e) => console.log('error ' + e));
  }
}

  render () {
    return (
      <View style={styles.container}>
        <View style={styles.placeholder}>
          <Image style={styles.previewImage} source={this.state.pickedImage}/>
        </View>

        <View style={styles.button}>
          <Button style={{paddingHorizontal: 5}} title="Pick an Image" onPress={() => this.pickImageHandler('pick')}/>
          <Button style={{paddingHorizontal: 5}} title="Take an Image" onPress={() => this.pickImageHandler('take')}/>
        </View>
      </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center'
  },
  button: {
    margin: 8,
    flexDirection: 'row',
    justifyContent: 'space-between'
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
});
