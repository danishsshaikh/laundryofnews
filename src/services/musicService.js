import TrackPlayer from 'react-native-track-player';
import {atom, useAtom} from 'jotai';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const currentTrackAtom = atom(null);
export const playbackStateAtom = atom(TrackPlayer.STATE_NONE);

export const initMusicPlayer = async () => {
  await TrackPlayer.setupPlayer();
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

  TrackPlayer.addEventListener('playback-state', async state => {
    await AsyncStorage.setItem('playbackState', state.toString());
    setPlaybackState(state);
  });

  const playbackState = await AsyncStorage.getItem('playbackState');
  if (playbackState) {
    setPlaybackState(parseInt(playbackState));
  }
};

export const fetchTracks = async () => {
  // const tracks = [
  //   {
  //     id: '1',
  //     title: 'Track 1',
  //     artist: 'Artist 1',
  //     albumArt:
  //       'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Dark_side_of_the_moon_album_cover.png/220px-Dark_side_of_the_moon_album_cover.png',
  //     url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
  //   },
  //   {
  //     id: '2',
  //     title: 'Track 2',
  //     artist: 'Artist 2',
  //     albumArt:
  //       'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Dark_side_of_the_moon_album_cover.png/220px-Dark_side_of_the_moon_album_cover.png',
  //     url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
  //   },
  //   {
  //     id: '3',
  //     title: 'Track 3',
  //     artist: 'Artist 3',
  //     albumArt:
  //       'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Dark_side_of_the_moon_album_cover.png/220px-Dark_side_of_the_moon_album_cover.png',
  //     url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3',
  //   },
  // ];

  const tracks = [
    {
      id: '1',
      url: require('../services/m1.mp3'),
      title: 'Track 1',
      artist: 'Artist 1',
      albumArt: require('../services/banner1.jpg'),
    },
    {
      id: '2',
      url: require('../services/m2.mp3'),
      title: 'Track 2',
      artist: 'Artist 2',
      albumArt: require('../services/banner2.jpg'),
    },
  ];

  await TrackPlayer.add(tracks);

  return tracks;
};

export const setCurrentTrack = async track => {
  await TrackPlayer.skip(track.id);
  setCurrentTrackAtom(track);
};

export const playMusic = async () => {
  await TrackPlayer.play();
};

export const pauseMusic = async () => {
  await TrackPlayer.pause();
};

export const skipToNext = async () => {
  await TrackPlayer.skipToNext();
};

export const skipToPrevious = async () => {
  await TrackPlayer.skipToPrevious();
};

export const seekTo = async position => {
  await TrackPlayer.seekTo(position);
};

export const setVolume = async volume => {
  await TrackPlayer.setVolume(volume);
};
