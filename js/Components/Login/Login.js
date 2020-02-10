import React, { Component } from 'react';
import {
 StyleSheet,
 View,
 Text,
 Image,
 KeyboardAvoidingView
} from 'react-native';
import LoginForm from './LoginForm';

export default class Login extends Component {
  static navigationOptions = () => ({
    title: 'Authentication',
    headerTintColor: 'blue',
    headerStyle: {
      backgroundColor: '#674b99',
      borderBottomWidth: 0,
      shadowOpacity: 0,
    },
    headerTintColor: 'white',

  });
  render() {
    return (
      <KeyboardAvoidingView behavior="padding" style={styles.container}>
        <View style={styles.logoContainer}>
          <Image
            style={styles.logo}
            source={require('../../images/logofinalwhite.png')}
          />
        </View>
        <View style={styles.formContainer}>
          <LoginForm />
        </View>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#674b99'
  },
  logoContainer: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 115,
    height: 75,
  }
})
