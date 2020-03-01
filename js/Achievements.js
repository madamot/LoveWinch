import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Button,
  TouchableOpacity
 } from 'react-native';
 import AsyncStorage from '@react-native-community/async-storage';


 const achievements = [
   {
     id: 1,
     name: 'Visit the Cathedral!',
   },
   {
     id: 2,
     name: 'Visit the Station',
   },
   {
     id: 3,
     name: 'Example',
   },
   {
     id: 4,
     name: 'Example',
   },
   ]

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
          {achievements.map(place =>
            <TouchableOpacity onPress={() => listItem.handler(place)} key={place.id}>
              <View style={styles.place}>
                <View style={styles.pic}></View>
                <Text>{place.name}</Text>
              </View>
            </TouchableOpacity>
          )}
        </View>
      );
    }
    else {
      return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <Text>Please login or make an account to start earning achievements</Text>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('Login')}
          >
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => this.props.navigation.navigate('Login')}
          >
            <Text style={styles.buttonTxt}>Login or Signup</Text>
          </TouchableOpacity>
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  pic: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'blue',
  },
  pic: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'blue',
  },
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
