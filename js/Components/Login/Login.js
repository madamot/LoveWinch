import React, { Component } from 'react';
import {
 StyleSheet,
 View,
 Text,
 Image,
 KeyboardAvoidingView,
 TouchableOpacity,
 AsyncStorage,
 AlertIOS
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
          <View style={styles.createAcContainer}>
            <Text style={styles.or}>or</Text>
            <TouchableOpacity style={[styles.buttonContainer, styles.createAc]}>
              <Text style={styles.buttonText} onPress={() => this.props.navigation.navigate('Signup')}>CREATE ACCOUNT</Text>
            </TouchableOpacity>
          </View>
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
    backgroundColor: '#674b99',
  },
  logoContainer: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 115,
    height: 75,
  },
  buttonContainer: {
    paddingVertical: 15,
    paddingHorizontal: '30%',
  },
  buttonText: {
    textAlign: 'center',
    color: '#FFF',
    fontWeight: '700'
  },
  createAcContainer: {
    padding: 20,
    // paddingBottom: 0,
  },
  or: {
    color: '#FFF',
    paddingBottom: 20,
    textAlign: 'center',
  },
  createAc: {
    backgroundColor: '#2980b9',
    paddingVertical: 15,
    paddingHorizontal: '30%',
  },
})
