// /**
//  * @format
//  */

// import {AppRegistry} from 'react-native';
// import App from './App';
// import {name as appName} from './app.json';

// AppRegistry.registerComponent(appName, () => App);

import React from 'react';
import {AppRegistry} from 'react-native';
import App from './App1';
import {name as appName} from './app.json';
import TrackPlayer from 'react-native-track-player';
import service from './service1';

AppRegistry.registerComponent(appName, () => App);

TrackPlayer.registerPlaybackService(() => require('./service1'));

TrackPlayer.setupPlayer().then(() => {
  // The player is ready to use!
  console.log('READY');
});

const MyApp = () => <App />;

AppRegistry.registerComponent(appName, () => MyApp);
