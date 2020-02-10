'use strict';

import React, { Component } from 'react';

import {StyleSheet} from 'react-native';

import {
  ViroARScene,
  ViroText,
  ViroConstants,
} from 'react-viro';

export default class HelloWorldSceneAR extends Component {

  static navigationOptions = {
    headerShown: false,
  };

  constructor() {
    super();

    // Set initial state here
    this.state = {
      text : "Initializing AR..."
    };

    // bind 'this' to functions
    this._onInitialized = this._onInitialized.bind(this);
  }

  render() {
    return (
      <ViroARScene onTrackingUpdated={this._onInitialized} >
        <ViroText text={this.state.text} scale={[.5, .5, .5]} position={[0, 0, -1]} style={styles.helloWorldTextStyle} />
      </ViroARScene>
    );
  }

  _onInitialized(state, reason) {
    if (state == ViroConstants.TRACKING_NORMAL) {
      this.setState({
        text : "Hello World!"
      });
    } else if (state == ViroConstants.TRACKING_NONE) {
      // Handle loss of tracking
    }
  }
}

var styles = StyleSheet.create({
  helloWorldTextStyle: {
    fontFamily: 'Arial',
    fontSize: 30,
    color: '#ffffff',
    textAlignVertical: 'center',
    textAlign: 'center',
  },
});

module.exports = HelloWorldSceneAR;


// import React from 'react';
//
// import {
//     ViroARScene,
//     Viro3DObject,
//     ViroAmbientLight
// } from 'react-viro';
//
// const MarmelabLogo = () => (
//     <Viro3DObject
//       source={require('../js/res/emoji_smile/emoji_smile.vrx')}
//       highAccuracyEvents={true}
//       position={[0, 0, -1]} // we place the object in front of us (z = -1)
//       scale={[0.2, 0.2, 0.2]} // we reduce the size of our Marmelab logo object
//       type="VRX"
//     />
// );
//
// const PlayScene = () => (
//     <ViroARScene displayPointCloud>
//         <ViroAmbientLight color="#fff" />
//         <MarmelabLogo />
//     </ViroARScene>
// );
//
// export default PlayScene;
