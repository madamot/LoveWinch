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
     users: [
       'testuser18',
     ],
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
    achievements: achievements,
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
    const sorted = this.state.achievements.users;
    console.log(this.state.achievements[0].users);
    if (this.state.achievements[0].users = this.state.name) {
      console.log('unlocked');
    }
    if (loggedin == true) {
      return (
        <View>
          {achievements.map(place =>
            <View style={ styles.containerUnlock} key={place.id}>
              <View style={styles.pic}></View>
              <Text style={styles.title}>{place.name}</Text>
            </View>
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
  container: {
    padding: 20,
    left: 0,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#d3d3d3',
    borderBottomColor: 'grey',
    borderBottomWidth: 0.3,
  },
  containerUnlock: {
    padding: 20,
    left: 0,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomColor: 'grey',
    borderBottomWidth: 0.3,
  },
  pic: {
    left: 0,
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'grey',
  },
  title: {
    paddingLeft: 25,
  },
  // button: {
  //   alignItems: 'center',
  //   justifyContent: 'center',
  //   marginTop: 15,
  //   borderWidth: 0.5,
  //   borderColor: '#147EFB',
  //   borderRadius: 10,
  //   padding: 15,
  //   marginRight: 1,
  //   backgroundColor: '#147EFB',
  //   color: 'white',
  // },
  // buttonTxt: {
  //   color: 'white',
  //   fontSize: 12,
  //   fontWeight: 'bold',
  // },
})
