import React, { Component } from 'react';
import {
  View,
  Text,
  Button,
 } from 'react-native';

export default class Achievements extends Component {

  componentDidMount = () => {
    this.checkUserSignedIn()
  }


  checkUserSignedIn = async() => {
    let context = this;
    try {
       let value = await AsyncStorage.getItem('key');
       if (value != null){
          AlertIOS.alert('Sync Complete', 'All your data are belong to us.');
          console.log('yay');
       }
       else {
          AlertIOS.alert('Sync fail', 'All your data not belong to us.');
          console.log('oh');
      }
    } catch (error) {
      // Error retrieving data
      console.log('fail');
    }
}
  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Achievements</Text>
      </View>
    );
  }
}
