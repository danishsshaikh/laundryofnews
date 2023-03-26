import React, {useEffect} from 'react';
// import {createNativeStackNavigator} from '@react-navigation/stack';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import TrackPlayer, {
//   usePlaybackState,
//   useTrackPlayerProgress,
// } from 'react-native-track-player';
import TrackPlayer, {
  usePlaybackState,
  useProgress,
} from 'react-native-track-player';
import {Provider, useAtom} from 'jotai';
import {trackAtom} from './atoms/trackAtom1';
import TrackListScreen from './screens/TrackListScreen1';
import PlayerScreen from './screens/PlayerScreen1';

const Stack = createNativeStackNavigator();

export default function App() {
  const playbackState = usePlaybackState();
  const {position, buffered, duration} = useProgress();
  const [track] = useAtom(trackAtom);

  useEffect(() => {
    const savePlayProgress = async () => {
      try {
        await AsyncStorage.setItem(
          'playProgress',
          JSON.stringify({id: track?.id, position}),
        );
      } catch (e) {
        console.log(e);
      }
    };

    savePlayProgress();
  }, [position]);

  useEffect(() => {
    // const setup = async () => {
    //   await TrackPlayer.setupPlayer();
    //   const tracks = []; // Define the `tracks` variable here
    //   await TrackPlayer.add(tracks);
    // };

    const loadPlayProgress = async () => {
      try {
        const value = await AsyncStorage.getItem('playProgress');
        if (value !== null) {
          const {id, position} = JSON.parse(value);
          await setup();
          await TrackPlayer.skip(id);
          await TrackPlayer.seekTo(position);
        }
      } catch (e) {
        console.log(e);
      }
    };

    loadPlayProgress();
  }, []);

  if (playbackState === null) {
    return null;
  }

  return (
    <Provider>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{headerShown: false}}>
          <Stack.Screen name="TrackList" component={TrackListScreen} />
          <Stack.Screen name="Player" component={PlayerScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
