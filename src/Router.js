import React from 'react';
import  {View, Text, TouchableOpacity, StyleSheet, Platform} from 'react-native';
import {Scene,Router, Actions, Tabs, Stack, Drawer} from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/Ionicons';
import Auth from './screens/Auth';
import Map from './screens/Map';
import Share from './screens/Share';
import PlaceDetail from './screens/PlaceDetail';
import LogoutScreen from './screens/LogoutScreen';

const ModalForPlatforms = () => {
  if(Platform.OS === 'ios') {
    return (
      <Scene key="DetailsTab">
        <Scene
          key="placeDetail"
          component={PlaceDetail}
          leftTitle={"Back"}
          onLeft={() => Actions.tabber({type:'reset'})}
          title="Share" />
      </Scene>
    );
  } else {
    return (
      <Scene key="DetailsTab">
        <Scene
          key="placeDetail"
          component={PlaceDetail}
          hideNavBar={true}
          title="Share" />
      </Scene>
    );
  }
}

const RouterComponent = () => {

  var content = Platform.OS === 'ios' ? false : true;

  return(
      <Router >
          <Scene key="LoginBoard" initial>
            <Scene key="login" component={Auth} title="Log in"/>
          </Scene>
          <Scene key="tabber" tabs tabBarStyle={style.tabBarStyle}>
            <Scene key="MapTab" icon={() => (<Icon name="ios-map" size={30}/>)} hideNavBar={true} initial>
              <Scene key="map" component={Map} title="Map" initial/>
            </Scene>
            <Scene key="ShareTab" icon={() => (<Icon name="ios-share-alt" size={30}/>)} hideNavBar={true}>
              <Scene key="share" component={Share} title="Share" />
            </Scene>
            <Scene key="LogOut" icon={() => (<Icon name="md-log-out" size={30}/>)} hideNavBar={true}>
              <Scene key="logout" component={LogoutScreen} title="Logout" />
            </Scene>
          </Scene>
          <Scene key="DetailsTab" hideNavBar={content}>
            <Scene
              key="placeDetail"
              component={PlaceDetail}
              leftTitle={"Back"}
              onLeft={() => Actions.tabber({type:'reset'})}
              title="Share" />
          </Scene>

      </Router>
    );


};
const style = StyleSheet.create({
        tabBarStyle: {
            borderTopWidth : .5,
            borderColor    : '#b7b7b7',
            backgroundColor: 'white',
            opacity: 1
        },
        padForNavBar: {
          paddingTop: 64
        }
});

export default RouterComponent;
