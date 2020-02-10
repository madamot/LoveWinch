import React from 'react';
import { createStackNavigator } from 'react-navigation-stack';

import Home from '../js/Home';
import Settings from '../js/Settings';
import ARContent from '../js/ARContent';
import Achievements from '../js/Achievements';
import Login from '../js/Components/Login/Login';

export default createStackNavigator({
  Home: Home,
  Settings: Settings,
  ARContent: ARContent,
  Achievements: Achievements,
  Login: Login,
});
