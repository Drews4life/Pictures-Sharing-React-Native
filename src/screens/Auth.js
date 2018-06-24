import React, {Component} from 'react';
import {
  Button,
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard
} from 'react-native';
import {Actions} from 'react-native-router-flux';
import {connect} from 'react-redux';

import {tryAuth} from '../actions';
import DefaultInput from '../components/DefaultInput';
import RoundButton from '../components/RoundButton';
import validate from '../utility/validation';


class Auth extends Component {

  state = {
    authMode: 'login',
    controls: {
      email: {
        value: '',
        valid: false,
        validationRules: {
          isEmail: true
        },
        touched: false
      },
      password: {
        value: '',
        valid: false,
        validationRules: {
          minLength: 6
        },
        touched: false
      },
      confirmPassword: {
        value: '',
        valid: false,
        validationRules: {
          equalTo: 'password'
        },
        touched: false
      }
    }
  };

  loginHandler = () => {
    const {email, password} = this.state.controls;
    const authData = {
      email: email.value,
      password: password.value
    };
    this.props.onLogin(authData);
    Actions.tabber({type: 'reset'});
  }

  updateInputState = (key, mainValue) => {
    let connectedValue = {};

    if(this.state.controls[key].validationRules.equalTo) {
      const equalControl = this.state.controls[key].validationRules.equalTo;
      const equalValue = this.state.controls[equalControl].value;
      connectedValue = {
        ...connectedValue,
        equalTo: equalValue
      };
    }
    if(key === 'password') {
      connectedValue = {
        ...connectedValue,
        equalTo: mainValue
      };
    }
    this.setState(previousState => {
      const {value, validationRules, valid} = previousState.controls.confirmPassword;
      console.log(this.state);
      return {
        controls: {
          ...previousState.controls,
          confirmPassword: {
            ...previousState.controls.confirmPassword,
            valid: key === 'password' ? validate(value, validationRules, connectedValue) : valid
          },
          [key]: {
            ...previousState.controls[key],
            value: mainValue,
            valid: validate(mainValue, previousState.controls[key].validationRules, connectedValue),
            touched: true
          }

        }
      };
    });
  }

  switchAuthModeHandler = () => {
    this.setState(previousState => {
      return {
        authMode: previousState.authMode === 'login' ? 'signup' : 'login'
      };
    })
  }

  render () {
    var {email, password, confirmPassword} = this.state.controls;
    let confirmPasswordControl = null;

    if(this.state.authMode === 'signup') {
      confirmPasswordControl = (
        <DefaultInput placeholder={"  confirm password"}
          secureTextEntry={true}
          valid={confirmPassword.valid}
          touched={confirmPassword.touched}
          value={confirmPassword.value}
          onChangeText={(val) => this.updateInputState('confirmPassword', val)}
          />
      );
    }
    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.containerMain}>
          <View style={styles.inputContainer}>
            <Text style={styles.welcomeText}>Please, Log in</Text>
            <DefaultInput placeholder={"  email"}
              autoCorrect={false}
              autoCapitalize={'none'}
              keyboardType={'email-address'}
              valid={email.valid}
              touched={email.touched}
              value={email.value}
              onChangeText={(val) => this.updateInputState('email', val)}
              />
            <DefaultInput placeholder={"  password"}
              secureTextEntry={true}
              valid={password.valid}
              touched={password.touched}
              value={password.value}
              onChangeText={(val) => this.updateInputState('password', val)}
              />
            {confirmPasswordControl}
          </View>


          <View style={styles.btnContainer}>
            <RoundButton
              disabled={false}
              Method={this.switchAuthModeHandler} >
                Switch to {this.state.authMode === 'login' ? 'Sign up' : 'Login'}
            </RoundButton>
            <RoundButton
              disabled={!email.valid || !password.valid || !confirmPassword.valid && this.state.authMode === 'signup'}
              Method={this.loginHandler} >
                {this.state.authMode === 'login' ? 'Log in' : 'Sign up'}
            </RoundButton>
          </View>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

const styles = StyleSheet.create({
  containerMain: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    backgroundColor: '#FDE3A7'
  },
  welcomeText: {
    fontSize: 30,
    color: '#1F3A93',
    fontWeight: 'bold',
    textAlign: 'center',
    alignSelf: 'center',
    paddingBottom: 10
  },
  inputContainer: {
    width: '90%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  btnContainer: {
    flexDirection: 'row',
    marginBottom: 155,
    height: 100,
  }
});

const mapDispatchToProps = dispatch => {
  return {
    onLogin: (authData) => dispatch(tryAuth(authData))
  }
};

export default connect(null, mapDispatchToProps)(Auth);
