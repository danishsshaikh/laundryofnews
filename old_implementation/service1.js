import TrackPlayer from 'react-native-track-player';

module.exports = async function () {
  TrackPlayer.addEventListener('remote-play', async () => {
    await TrackPlayer.play();
  });

  TrackPlayer.addEventListener('remote-pause', async () => {
    await TrackPlayer.pause();
  });

  TrackPlayer.addEventListener('remote-stop', async () => {
    await TrackPlayer.stop();
  });

  TrackPlayer.addEventListener('remote-seek', async data => {
    await TrackPlayer.seekTo(data.position);
  });

  TrackPlayer.addEventListener('playback-queue-ended', async () => {
    await TrackPlayer.stop();
    await TrackPlayer.reset();
  });

  TrackPlayer.addEventListener('playback-track-changed', async data => {
    const track = await TrackPlayer.getTrack(data.nextTrack);

    if (!track) {
      return;
    }

    TrackPlayer.updateMetadataForTrack(data.nextTrack, {
      title: track.title,
      artist: track.artist,
      artwork: track.artwork,
    });
  });
};
