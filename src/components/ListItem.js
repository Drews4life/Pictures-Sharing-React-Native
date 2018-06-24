import React from 'react';
import {
  Text,
  ScrollView,
  StyleSheet,
  View,
  TouchableOpacity,
  Image
} from 'react-native';


const ListItem = (props) => (
  <TouchableOpacity onPress={props.onItemPressed}>
    <View style={styles.listItem}>
      <Image style={styles.placeImg} source={props.placeImage}/>
      <Text>{props.placeName}</Text>
    </View>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#eee',
    margin: 5,
    borderWidth: 0.2,
    borderRadius: 50,
    width: '90%',
    padding: 10,
  },
  placeImg: {
    marginRight: 8,
    height: 30,
    width: 30,
    borderRadius: 15,
  }
});

export default ListItem;
