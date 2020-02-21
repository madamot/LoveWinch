import React, { Component } from 'react';
import {
 StyleSheet,
 View,
 Text,
 Image,
 TextInput,
 KeyboardAvoidingView,
 TouchableOpacity,
 AlertIOS
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { useNavigation } from '@react-navigation/native';

export default class Login extends Component {

  componentWillUnmount() {

    const {params} = this.props.navigation.state;
    params.callHome();
  }

  static navigationOptions = () => ({
    title: 'Login',
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
    password: null,
  }

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
      this.props.navigation.navigate('Home');
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
          <View style={SignupStyles.container}>
            <View style={SignupStyles.inputContainer}>
              <TextInput
                style={SignupStyles.input}
                placeholder="Username"
                placeholderTextColor="rgba(225,225,225,0.7)"
                onChangeText={(username) => this.setState({username})}
                autoCapitalize = 'none'
              />
              <TextInput
                style={SignupStyles.input}
                placeholder="Password"
                placeholderTextColor="rgba(225,225,225,0.7)"
                secureTextEntry
                onChangeText={(password) => this.setState({password})}
                autoCapitalize = 'none'
              />
            </View>

            <TouchableOpacity style={[SignupStyles.buttonContainer, SignupStyles.login]}>
              <Text style={SignupStyles.buttonText} onPress={this.loginHandler}>LOGIN</Text>
            </TouchableOpacity>
          </View>

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

const SignupStyles = StyleSheet.create({
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
