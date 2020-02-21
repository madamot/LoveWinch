import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Button,
  TouchableOpacity
 } from 'react-native';
 import AsyncStorage from '@react-native-community/async-storage';


export default class Settings extends Component {

  

  state = {
    name: null,
  }


  componentDidMount = () => {
    this.getData();
  }


  getData = async () => {
  try {
    const name = await AsyncStorage.getItem('name')
      this.setState({name: name})

  } catch(e) {
    console.log('oh');
  }
}

  logoutHandler = async() => {

    fetch('http://127.0.0.1:8000/api/v1/rest-auth/logout/', {
      method: 'POST', // or 'PUT'
      headers: {
        'Content-Type': 'application/json',
        // 'Authorization': '74a5dc0339dec9ccd96fcf41a62d35fb62e039b8',
      },
    })
    .then((response) => response.json())
    .then((data) => {
      console.log('Success:', data);
      this.removeItemValue();
    })
    .catch((error) => {
      console.error('Error:', error);
    });
  }

  removeItemValue = async (key) => {
    try {
        await AsyncStorage.removeItem(this.state.name);
        await AsyncStorage.removeItem('name');
        console.log('removed token');
      } catch(exception) {
          console.log('oh');
        }
      }

  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => this.logoutHandler()}
        >
          <Text style={styles.buttonTxt}>Logout</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 15,
    borderWidth: 0.5,
    borderColor: '#147EFB',
    borderRadius: 10,
    padding: 15,
    marginRight: 1,
    backgroundColor: '#147EFB',
    color: 'white',
  },
  buttonTxt: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
})
