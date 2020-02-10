import React, { Component } from 'react';
import {
 StyleSheet,
 View,
 TextInput,
 Text,
 TouchableOpacity,
} from 'react-native';

export default class LoginForm extends Component {
  render() {
    return (
        <View style={styles.container}>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Username"
              placeholderTextColor="rgba(225,225,225,0.7)"
            />
            <TextInput
              style={styles.input}
              placeholder="Password"
              placeholderTextColor="rgba(225,225,225,0.7)"
              secureTextEntry
            />
          </View>

          <TouchableOpacity style={[styles.buttonContainer, styles.login]}>
            <Text style={styles.buttonText}>LOGIN</Text>
          </TouchableOpacity>
          <Text style={styles.or}>or</Text>
          <TouchableOpacity style={[styles.buttonContainer, styles.createAc]}>
            <Text style={styles.buttonText}>CREATE ACCOUNT</Text>
          </TouchableOpacity>
        </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  inputContainer: {
    alignItems: 'center',
  },
  input: {
    height: 40,
    backgroundColor: 'rgba(225,225,225,0.2)',
    marginBottom: 10,
    paddingLeft: 10,
    color: '#FFF',
    width: '100%',
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
  login: {
    backgroundColor: '#E51E79',
  },
  or: {
    color: '#FFF',
    padding: 20,
    textAlign: 'center',
  },
  createAc: {
    backgroundColor: '#2980b9',
  }
})
