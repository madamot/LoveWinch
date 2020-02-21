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
import AsyncStorage from '@react-native-community/async-storage';


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

// usernameInputHandler = (enteredUser) => {
//   this.setState({ enteredUser: enteredUser })
// }
//
// emailInputHandler = (enteredEmail) => {
//   this.setState({ enteredEmail: enteredEmail })
// }
//
// password1InputHandler = (enteredPass1) => {
//   this.setState({ enteredPass1: enteredPass1 })
// }
// password2InputHandler = (enteredPass2) => {
//   this.setState({ enteredPass2: enteredPass2 })
// }

// const data = { 'username': ;'testuser8', 'email': 'testuser8@email.com', 'password1': 'testpass123', 'password2': 'testpass123', };
// const data = { 'username': this.state.SUenteredUser, 'email': this.state.SUenteredEmail, 'password1': this.state.SUenteredPass1, 'password2': this.state.SUenteredPass2, };


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


// storeToken = async (data) => {
//   console.log(data.key);
//   const key = JSON.stringify(data.key);
//   try {
//     await AsyncStorage.setItem('key', key);
//     this.importData();
//   } catch (error) {
//     console.log(error);
//   }
// };
//
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

  render() {
    return (
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

          <TouchableOpacity style={[styles.buttonContainer, styles.login]}>
            <Text style={styles.buttonText} onPress={this.signupHandler}>LOGIN</Text>
          </TouchableOpacity>
        </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    // paddingBottom: 0,
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
  }
})
