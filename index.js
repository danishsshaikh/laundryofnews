import React from 'react';
import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import TrackPlayer from 'react-native-track-player';
import service from './service';

AppRegistry.registerComponent(appName, () => App);

TrackPlayer.registerPlaybackService(() => service);

TrackPlayer.setupPlayer().then(() => {
  // The player is ready to use!
  console.log('Ready to use');
});

const MyApp = () => <App />;

AppRegistry.registerComponent(appName, () => MyApp);
