import React from 'react';
import { createStackNavigator } from 'react-navigation-stack';

import Home from '../js/Home';
import Settings from '../js/Settings';
// import ARContent from '../js/ARContent';

export default createStackNavigator({
  Home: Home,
  Settings: Settings,
  // ARContent: ARContent,
});
