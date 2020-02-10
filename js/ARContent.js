import React, { Component } from 'react';
import { View, StyleSheet, TouchableHighlight, Image, Text, Dimensions } from 'react-native';
import { ViroARSceneNavigator } from 'react-viro';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

// import { VIROAPIKEY } from 'react-native-dotenv';

import PlayScene from './Components/PlayScene';

const styles = StyleSheet.create({
    root: {
        flex: 1,
        backgroundColor: '#fff',
    },
    overlay: {
        flex: 1,
        left: 0,
        top: 0,
        bottom: 0,
        right: 0,
        position: 'absolute',
        alignItems: 'center',
        justifyContent: 'center',
    },
    playButton: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    map: {
     flex: 1,
   },
});

const states = {
    MENU: 'MENU',
    PLAY: 'PLAY',
    PLAY: 'PLAYPORTAL',
};

class MainScene extends Component {

  static navigationOptions = {
    headerShown: false,
  };

    state = {
        appState: states.MENU,
    };

    handleSetAppState = appState => () => this.setState({ appState });

    renderARPortal = scene => (
          <View style={localStyles.outer} >
            <ViroARSceneNavigator apiKey="1AB415AE-A2C5-419E-B175-36434EF75A67" initialScene={{ scene }} />

            <View style={{position: 'absolute',  left: 0, right: 0, bottom: 77, alignItems: 'center'}}>
              <TouchableHighlight style={localStyles.buttons}
                onPress={this.handleSetAppState(states.MENU)}
                underlayColor={'#00000000'} >
                <Text style={localStyles.buttonText}>Exit</Text>
              </TouchableHighlight>
            </View>
          </View>
        );

    renderMenu = () => (
        <View style={styles.overlay}>
          <TouchableHighlight onPress={this.handleSetAppState(states.PLAY)}>
            <View style={styles.playButton}>

              <Text style={{ fontSize: 30 }}>{JSON.stringify(this.props.navigation.getParam('location', 'NO-ID'))}</Text>
            </View>
          </TouchableHighlight>
          {/* <TouchableHighlight onPress={this.handleSetAppState(states.PLAYPORTAL)}>
            <View style={styles.playButton}>
              <Text style={{ fontSize: 30 }}>PORTAL</Text>
            </View>
          </TouchableHighlight> */}
        </View>
    );

    renderPlay = () => this.renderARPortal(PlayScene);

    renderPlayPortal = () => this.renderARPortal(PortalScene);

    renderAppState = () => {
        const { appState } = this.state;

        switch (appState) {
            case states.MENU:
                return (
                  this.renderMenu()

                );
            case states.PLAY:
                return this.renderPlay();
            case states.PLAYPORTAL:
                return this.renderPlayPortal();
            default:
                return null;
        }
    };

    render() {
        return <View style={styles.root}>{this.renderAppState()}</View>;

    }
}

var localStyles = StyleSheet.create({
  outer : {
    flex : 1,
    flexDirection: 'row',
    alignItems:'center',
    backgroundColor: "black",
  },
  inner: {
    flex : 1,
    flexDirection: 'column',
    alignItems:'center',
    backgroundColor: "black",
  },
  titleText: {
    paddingTop: 30,
    paddingBottom: 20,
    color:'#fff',
    textAlign:'center',
    fontSize : 25
  },
  buttonText: {
    color:'#fff',
    textAlign:'center',
    fontSize : 20
  },
  buttons : {
    height: 80,
    width: 150,
    paddingTop:20,
    paddingBottom:20,
    marginTop: 10,
    marginBottom: 10,
    backgroundColor:'#68a0cf',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#fff',
  }
});

export default MainScene;
