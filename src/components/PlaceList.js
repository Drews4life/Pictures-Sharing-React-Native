import React from "react";
import { StyleSheet, FlatList, Text,View } from "react-native";

import ListItem from "./ListItem";

const placeList = props => {
  console.log("THATS PROPS: " + typeof(props.places));
  console.log(props.places);
  if(props.places != ""){
    return (
      <FlatList
        style={styles.listContainer}
        data={props.places}
        renderItem={(info) => (
          <ListItem
            placeName={info.item.name}
            placeImage={info.item.image}
            onItemPressed={() => props.onItemSelected(info.item.key)}
          />
        )}
      />
    );
  } else {
    return (
      <View style={styles.container}>
          <Text style={styles.tip}>Nothing to show yet!</Text>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  listContainer: {
    width: "100%"
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  tip: {
    fontSize: 25,
    fontWeight: 'bold'
  }
});

export default placeList;
