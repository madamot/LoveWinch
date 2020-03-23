import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  Text,
  Button,
  Dimensions,
  TouchableOpacity
 } from 'react-native';
 import AsyncStorage from '@react-native-community/async-storage';

 const { height, width } = Dimensions.get('screen');



 const achievements = [
   {
     id: 1,
     name: 'Visit the Cathedral!',
     users: [
       'testuser18',
       'testuser17'
     ],
   },
   {
     id: 2,
     name: 'Visit the Station',
     users: [
       'testuser18',
       'testuser17'
     ],
   },
   {
     id: 3,
     name: 'Example 1',
     users: [
       'testuser17'
     ],
   },
   {
     id: 4,
     name: 'Example 2',
     users: [
       'testuser17'
     ],
   },
   {
     id: 5,
     name: 'Example 3',
     users: [
       'testuser16'
     ],
   },
   {
     id: 6,
     name: 'Example 4',
     users: [
       'testuser16',
       'testuser18',
       'testuser15',
       'testuser13'
     ],
   },
   ]

export default class Achievements extends Component {

  state = {
    loggedin: false,
    name: null,
    achievements: achievements,
    userAchievements: [],
    userNotAchieved: [],
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
    this.check()
  } catch(e) {
    console.log('oh');
  }

}

  // check = async () => {
  //   let userAchievements = this.state.userAchievements;
  //   let userNotAchieved = this.state.userNotAchieved;
  //   let achieve = this.state.achievements;
  //   for (var i = 0; i < achieve.length; i++) {
  //     let achieveUsers = achieve[i].users;
  //     for (var k = 0; k < achieveUsers.length; k++) {
  //       if (achieveUsers[k].includes(this.state.name)) {
  //         let userAchievements = this.state.userAchievements.push(achieve[i])
  //
  //         // splice out from completed vars
  //
  //         // userAchieves([...userAchievements, achieve[i]]);
  //       }else {
  //         // let userNotAchieved = userNotAchieved.splice(achieve[i])
  //         let userNotAchieved = this.state.userNotAchieved.push(achieve[i])
  //       }
  //
  //     }
  //   }
  //   this.setState({userAchievements: userAchievements, userNotAchieved: userNotAchieved})
  //   // console.log(userAchievements);
  //   console.log(this.state.achievements);
  // }

  check = async () => {
    let userAchievements = this.state.userAchievements;
    let userNotAchieved = this.state.userNotAchieved;
    let achieve = this.state.achievements;
    for (var i = 0; i < achieve.length; i++) {
      let achieveUsers = achieve[i].users;
      // console.log(achieve[i].users);
      for (var m = 0; m < achieveUsers.length; m++) {

        if (achieveUsers[m] === this.state.name) {
          let userAchievements = this.state.userAchievements.push(achieve[i])
          console.log('ACHIEVED', achieve[i]);
          break;
          // splice out from completed vars

          // userAchieves([...userAchievements, achieve[i]]);
        } else if (achieveUsers[m] != this.state.name) {
            if ((m + 1) == (achieveUsers.length)) {
              let userNotAchieved = this.state.userNotAchieved.push(achieve[i])
            } else {
              continue;
            }
          // let userNotAchieved = userNotAchieved.splice(achieve[i])

          console.log('NOT ACHIEVED', achieve[i]);
        }

      }
      // for (var k = 0; k < achieveUsers.length; k++) {
      //   if (achieveUsers[k].includes(this.state.name)) {
      //
      //   }else {
      //
      //   }
      //
      // }
    }
    this.setState({userAchievements: userAchievements, userNotAchieved: userNotAchieved})
    // console.log(userAchievements);
    // console.log(userNotAchieved);
  }


  render() {
    const { loggedin } = this.state;
    const achieveEasy = this.state.achievements.users;
    // // console.log(this.state.achievements[0].users);
    // if (achieve.includes(this.state.name)) {
    //   console.log('unlocked');
    // }
    if (loggedin == true) {

      return (
        <View style={styles.box}>
          <View style={styles.hide}>
            <Text style={styles.emoji}>&#129323;</Text>
          </View>
          <ScrollView>
            <View>
              {this.state.userAchievements.map(achieve =>
                <View style={ styles.containerUnlock} key={achieve.id}>
                  <View style={styles.pic}></View>
                  <Text style={styles.title}>{achieve.name}</Text>
                </View>
              )}
            </View>
            <View>
              {this.state.userNotAchieved.map(achieve =>
                <View style={styles.container} key={achieve.id}>
                  <View style={styles.pic}></View>
                  <Text style={styles.title}>{achieve.name}</Text>
                </View>
              )}
            </View>
          </ScrollView>
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
  box: {
    height: height,
  },
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
    backgroundColor: '#6fbf73',
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
  hide: {
    position: 'absolute',
    width: width,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  emoji: {
    textAlign: 'center',
    fontSize: 50,
    padding: 10,
  }
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
