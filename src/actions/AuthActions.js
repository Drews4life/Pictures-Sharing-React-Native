import firebase from 'firebase';
import {Actions} from 'react-native-router-flux';

export const tryAuth = authData => {
    return {
      type: "TRY_AUTH",
      payload: authData
    };
};

export const loginUser = ({email, password}) => {
  return dispatch => {
    dispatch({type: 'FETCHING_DATA'});
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(() => {
        console.log('login succeded');
        Actions.tabber({type: 'reset'});
        dispatch({type: "LOGIN_USER_SUCCESS"});
      })
      .catch((e) => {
        console.log('login failed with error: ' + e);
        dispatch({type: "LOGIN_USER_FAILURE"})
      });
  };
};

export const signUpUser = ({email, password}) => {
  return dispatch => {
    dispatch({type: 'FETCHING_DATA'});
    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then(() => {
        Actions.tabber({type: 'reset'});
        dispatch({type: "LOGIN_USER_SUCCESS"});
      })
      .catch(() => {
        dispatch({type: "SIGNUP_USER_FAILURE"})
      });
  };
};

export const clearAuthError = () => {
  return {
    type: "CLEAN_ERRORS"
  };
};
