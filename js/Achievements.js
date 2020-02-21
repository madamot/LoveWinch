import React, { Component } from 'react';
import {
  View,
  Text,
  Button,
 } from 'react-native';
 import AsyncStorage from '@react-native-community/async-storage';


export default class Achievements extends Component {

  state = {
    loggedin: false,
    name: null,
  }


  componentDidMount = () => {
    this.getData();
    console.log('reloaded');
  }


  getData = async () => {
  try {
    const name = await AsyncStorage.getItem('name')
    if(name !== null) {
      this.setState({loggedin: true, name: name})
    }
  } catch(e) {
    console.log('oh');
  }
}

  render() {
    const { loggedin } = this.state;
    if (loggedin == true) {
      return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <Text>Hello {this.state.name}</Text>
          <Text>Logged in</Text>
        </View>
      );
    }
    else {
      return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <Text>Not logged in</Text>
        </View>
      );
    }
  }
}
