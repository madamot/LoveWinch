import React, { Component } from 'react';
import {
 StyleSheet,
 View,
 Image,
 KeyboardAvoidingView,
 TouchableOpacity,
 TextInput,
 Text,
 AlertIOS
} from 'react-native';

export default class Signup extends Component {
  static navigationOptions = () => ({
    title: 'Signup',
    headerTintColor: 'blue',
    headerStyle: {
      backgroundColor: '#674b99',
      borderBottomWidth: 0,
      shadowOpacity: 0,
    },
    headerTintColor: 'white',
  });

  state = {
    username: null,
    email: null,
    password1: null,
    password2: null,
  }

signupHandler = async() => {
  fetch('http://127.0.0.1:8000/api/v1/rest-auth/registration/', {
    method: 'POST', // or 'PUT'
    headers: {
      'Content-Type': 'application/json',
      // 'Authorization': '74a5dc0339dec9ccd96fcf41a62d35fb62e039b8',
    },
    body: JSON.stringify({ 'username': this.state.username, 'email': this.state.email, 'password1': this.state.password1, 'password2': this.state.password2 }),
  })
  .then((response) => response.json())
  .then((data) => {
    // this.storeToken(data);
    console.log('Success:', data);
    this.props.navigation.navigate('Login');
  })
  .catch((error) => {
    console.error('Error:', error);
  });
}

  render() {
    return (
    <KeyboardAvoidingView behavior="padding" style={styles.container}>
      <View style={styles.logoContainer}>
        <Image
          style={styles.logo}
          source={require('../../images/logofinalwhite.png')}
        />
      </View>
      <View style={styles.container}>
        <View style={styles.inputContainer}>
          <Text>{this.state.username}</Text>
          <TextInput
            style={styles.input}
            placeholder="Username"
            placeholderTextColor="rgba(225,225,225,0.7)"
            onChangeText={(username) => this.setState({username})}
            value={this.state.username}
            autoCapitalize = 'none'
          />
          <TextInput
            style={styles.input}
            placeholder="Email"
            placeholderTextColor="rgba(225,225,225,0.7)"
            onChangeText={(email) => this.setState({email})}
            value={this.state.email}
            autoCapitalize = 'none'
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            placeholderTextColor="rgba(225,225,225,0.7)"
            secureTextEntry
            onChangeText={(password1) => this.setState({password1})}
            value={this.state.password1}
            autoCapitalize = 'none'
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            placeholderTextColor="rgba(225,225,225,0.7)"
            secureTextEntry
            onChangeText={(password2) => this.setState({password2})}
            value={this.state.password2}
            autoCapitalize = 'none'
          />
        </View>

        <TouchableOpacity onPress={this.signupHandler} style={[styles.buttonContainer, styles.login]}>
          <Text style={styles.buttonText}>SIGN UP</Text>
        </TouchableOpacity>
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
})
