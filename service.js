import TrackPlayer from 'react-native-track-player';

module.exports = async function () {
  TrackPlayer.addEventListener('remote-play', () => {
    TrackPlayer.play();
  });

  TrackPlayer.addEventListener('remote-pause', () => {
    TrackPlayer.pause();
  });

  TrackPlayer.addEventListener('remote-stop', () => {
    TrackPlayer.stop();
  });

  TrackPlayer.addEventListener('remote-seek', event => {
    TrackPlayer.seekTo(event.position);
  });

  TrackPlayer.addEventListener('remote-jump-forward', async ({interval}) => {
    const position = await TrackPlayer.getPosition();
    await TrackPlayer.seekTo(position + interval);
  });

  TrackPlayer.addEventListener('remote-jump-backward', async ({interval}) => {
    const position = await TrackPlayer.getPosition();
    await TrackPlayer.seekTo(position - interval);
  });

  TrackPlayer.addEventListener('playback-track-changed', async event => {
    const track = await TrackPlayer.getTrack(event.nextTrack);
    TrackPlayer.updateMetadataForTrack(event.nextTrack, {
      title: track.title,
      artist: track.artist,
      artwork: track.albumArt,
    });
  });

  TrackPlayer.addEventListener('playback-state', async state => {
    if (
      state.state === TrackPlayer.STATE_PLAYING ||
      state.state === TrackPlayer.STATE_PAUSED
    ) {
      await TrackPlayer.updateOptions({
        notification: {
          title: state.track.title,
          artist: state.track.artist,
          icon: state.track.url,
        },
      });
    }
  });

  await TrackPlayer.setupPlayer();

  TrackPlayer.registerPlaybackService(() => require('./service.js'));

  const tracks = [
    {
      id: '1',
      url: require('./assets/m1.mp3'),
      title: 'Track 1',
      artist: 'Artist 1',
      albumArt: require('./assets/banner1.jpg'),
    },
    {
      id: '2',
      url: require('./assets/m2.mp3'),
      title: 'Track 2',
      artist: 'Artist 2',
      albumArt: require('./assets/banner2.jpg'),
    },
  ];

  await TrackPlayer.add(tracks);
};
