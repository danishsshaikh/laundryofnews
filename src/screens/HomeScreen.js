import React, {useEffect, useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {useAtom} from 'jotai';
import TrackList from '../components/TrackList';
import MiniPlayer from '../components/MiniPlayer';
import Player from '../components/Player';
import {
  currentTrackAtom,
  playbackStateAtom,
  fetchTracks,
  setCurrentTrack,
  playMusic,
  pauseMusic,
  skipToNext,
  skipToPrevious,
  seekTo,
  setVolume,
} from '../services/musicService';
import TrackPlayer from 'react-native-track-player';

const HomeScreen = () => {
  const [tracks, setTracks] = useState([]);
  const [currentTrack, setCurrentTrackAtom] = useAtom(currentTrackAtom);
  const [playbackState, setPlaybackState] = useAtom(playbackStateAtom);
  const [showPlayer, setShowPlayer] = useState(false);

  useEffect(() => {
    initMusicPlayer();
    loadTracks();
  }, []);

  const initMusicPlayer = async () => {
    await TrackPlayer.setupPlayer();
    await fetchTracks();
    await TrackPlayer.reset();
    await TrackPlayer.add(tracks);
    await TrackPlayer.updateOptions({
      stopWithApp: true,
      capabilities: [
        TrackPlayer.CAPABILITY_PLAY,
        TrackPlayer.CAPABILITY_PAUSE,
        TrackPlayer.CAPABILITY_SKIP_TO_NEXT,
        TrackPlayer.CAPABILITY_SKIP_TO_PREVIOUS,
        TrackPlayer.CAPABILITY_STOP,
      ],
      compactCapabilities: [
        TrackPlayer.CAPABILITY_PLAY,
        TrackPlayer.CAPABILITY_PAUSE,
        TrackPlayer.CAPABILITY_SKIP_TO_NEXT,
        TrackPlayer.CAPABILITY_SKIP_TO_PREVIOUS,
      ],
    });

    TrackPlayer.addEventListener('playback-state', async ({state}) => {
      await AsyncStorage.setItem('playbackState', state.toString());
      setPlaybackState(state);
    });

    const playbackState = await AsyncStorage.getItem('playbackState');
    if (playbackState && !isNaN(playbackState)) {
      setPlaybackState(parseInt(playbackState));
    }
  };

  const loadTracks = async () => {
    const tracks = await fetchTracks();
    setTracks(tracks);
    console.log('tracks ' + tracks);
  };

  const handleTrackPress = async track => {
    setShowPlayer(true);
    await setCurrentTrack(track);
    await playMusic();
  };

  const handlePlayPause = async () => {
    if (playbackState === TrackPlayer.STATE_PLAYING) {
      await pauseMusic();
    } else {
      await playMusic();
    }
  };

  const handleSkip = async () => {
    await skipToNext();
  };

  const handlePrevious = async () => {
    await skipToPrevious();
  };

  const handleSeek = async position => {
    await seekTo(position);
  };

  const handleSetVolume = async volume => {
    await setVolume(volume);
  };

  return (
    <View style={styles.container}>
      <Text>News Laundry Podcast App</Text>
      <TrackList tracks={tracks} onPress={handleTrackPress} />
      {showPlayer && (
        <View style={styles.playerContainer}>
          {currentTrack && (
            <MiniPlayer
              track={currentTrack}
              onPlayPause={handlePlayPause}
              onSkip={handleSkip}
              onPrevious={handlePrevious}
            />
          )}
          <Player
            track={currentTrack}
            onPlayPause={handlePlayPause}
            onSkip={handleSkip}
            onPrevious={handlePrevious}
            onSeek={handleSeek}
            onSetVolume={handleSetVolume}
            playbackState={playbackState}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  playerContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
});

export default HomeScreen;
