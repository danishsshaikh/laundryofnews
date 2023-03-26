import React, {useEffect} from 'react';
import {View, Text, TouchableOpacity, Image} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {Ionicons} from '@expo/vector-icons';
import Slider from '@react-native-community/slider';
import {
  useProgress,
  usePlaybackState,
  useTrackPlayerEvents,
} from 'react-native-track-player';
import {useAtom} from 'jotai';
import {trackAtom} from '../atoms/trackAtom1';
import TrackPlayer from 'react-native-track-player';

export default function PlayerScreen() {
  const navigation = useNavigation();
  const [track] = useAtom(trackAtom);
  const playbackState = usePlaybackState();
  const {position, buffered, duration} = useProgress();

  useEffect(() => {
    navigation.setOptions({
      headerTitle: track?.title,
      headerTintColor: '#fff',
      headerStyle: {backgroundColor: '#333'},
      gestureEnabled: false,
    });
    console.log(track);
  }, [navigation, track]);

  const handlePlayPause = async () => {
    console.log(playbackState);
    if (playbackState === 3) {
      // 3 is the code for playing
      await TrackPlayer.pause();
    } else {
      await TrackPlayer.play();
    }
  };

  const handlePrevious = async () => {
    await TrackPlayer.skipToPrevious();
  };

  const handleNext = async () => {
    await TrackPlayer.skipToNext();
  };

  useTrackPlayerEvents(['playback-queue-ended'], async event => {
    if (event.type === 'playback-queue-ended') {
      await TrackPlayer.reset();
    }
  });

  return (
    <View style={{flex: 1, backgroundColor: '#fff', alignItems: 'center'}}>
      <Image
        source={track?.artwork}
        style={{width: 250, height: 250, marginTop: 30}}
      />
      <View style={{flexDirection: 'row', alignItems: 'center', marginTop: 30}}>
        <TouchableOpacity onPress={handlePrevious}>
          <Text>Previous</Text>
          {/* <Ionicons name="play-skip-back-outline" size={32} color="#555" /> */}
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handlePlayPause}
          style={{marginLeft: 30, marginRight: 30}}>
          <Text>{playbackState === 3 ? 'pause' : 'play'}</Text>

          {/* <Ionicons
            name={
              playbackState === 3
                ? 'pause-circle-outline'
                : 'play-circle-outline'
            }
            size={64}
            color="#333"
          /> */}
        </TouchableOpacity>
        <TouchableOpacity onPress={handleNext}>
          <Text>Next</Text>
          {/* <Ionicons name="play-skip-forward-outline" size={32} color="#555" /> */}
        </TouchableOpacity>
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginTop: 30,
          width: '80%',
        }}>
        <Text>{new Date(position * 1000).toISOString().substr(14, 5)}</Text>
        <Slider
          style={{flex: 1}}
          minimumValue={0}
          maximumValue={duration}
          value={position}
          minimumTrackTintColor="#333"
          maximumTrackTintColor="#aaa"
        />
        <Text>
          -{new Date((duration - position) * 1000).toISOString().substr(14, 5)}
        </Text>
      </View>
    </View>
  );
}
