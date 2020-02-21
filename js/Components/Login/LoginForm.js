import React, { Component } from 'react';
import {
 StyleSheet,
 View,
 TextInput,
 Text,
 TouchableOpacity,
 AlertIOS
} from 'react-native';
import * as axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';
import { useNavigation } from '@react-navigation/native';

// import Signup from '../Signup/Signup';


export default class LoginForm extends Component {




  state = {
    username: null,
    password: null,
  }

// usernameInputHandler = (enteredUser) => {
//   this.setState({ enteredUser })
// }
//
// emailInputHandler = (enteredEmail) => {
//   this.setState({ enteredEmail })
// }
//
// passwordInputHandler = (enteredPass) => {
//   this.setState({ enteredPass })
// }

// const data = { 'username': 'testuser3', 'email': 'testuser3@email.com', 'password1': 'testpass123', 'password2': 'testpass123' };

loginHandler = async() => {

  fetch('http://127.0.0.1:8000/api/v1/rest-auth/login/', {
    method: 'POST', // or 'PUT'
    headers: {
      'Content-Type': 'application/json',
      // 'Authorization': '74a5dc0339dec9ccd96fcf41a62d35fb62e039b8',
    },
    body: JSON.stringify({ 'username': this.state.username, 'password': this.state.password }),
  })
  .then((response) => response.json())
  .then((data) => {
    this.storeToken(data);
    console.log('Success:', data);
  })
  .catch((error) => {
    console.error('Error:', error);
  });
}

storeToken = async (data) => {
  console.log(data.key);
  const key = JSON.stringify(data.key);
  try {
    await AsyncStorage.setItem(this.state.username, key);
    await AsyncStorage.setItem('name', this.state.username);
    // this.importData();
  } catch (error) {
    console.log(error);
  }
};

// importData = async () => {
//   try {
//     const keys = await AsyncStorage.getAllKeys();
//     const result = await AsyncStorage.multiGet(keys);
//
//     return result.map(req => JSON.parse(req)).forEach(console.log);
//   } catch (error) {
//     console.error(error)
//   }
// }



  // var DEMO_TOKEN = await AsyncStorage.getItem(STORAGE_KEY);
  // fetch("http://127.0.0.1:8000/api/v1/rest-auth/login/", {
  //   method: "POST",
    // headers: {
    //   'Authorization': 'Bearer ' + DEMO_TOKEN
    // }
  // })
  // .then((response) => {
  //   console.log(response);
  // })
  // .then((quote) => {
  //   AlertIOS.alert(
  //     "Chuck Norris Quote:", quote)
  // })
  // .done();
// }


// storeToken = async () => {
//   try {
//     await AsyncStorage.setItem('AuthKey', 'I like to save it.');
//   } catch (error) {
//     console.log(error);
//   }
// };

  render() {
    return (
        <View style={styles.container}>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Username"
              placeholderTextColor="rgba(225,225,225,0.7)"
              onChangeText={(username) => this.setState({username})}
              autoCapitalize = 'none'
            />
            <TextInput
              style={styles.input}
              placeholder="Password"
              placeholderTextColor="rgba(225,225,225,0.7)"
              secureTextEntry
              onChangeText={(password) => this.setState({password})}
              autoCapitalize = 'none'
            />
          </View>

          <TouchableOpacity style={[styles.buttonContainer, styles.login]}>
            <Text style={styles.buttonText} onPress={this.loginHandler}>LOGIN</Text>
          </TouchableOpacity>

        </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingBottom: 0,
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
