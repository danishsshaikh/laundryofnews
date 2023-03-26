import React, {useState, useRef} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
  Image,
  Slider,
  TouchableWithoutFeedback,
} from 'react-native';
import {MaterialIcons} from '@expo/vector-icons';
import TrackPlayer, {useProgress} from 'react-native-track-player';

const Player = ({
  track,
  onPlayPause,
  onSkip,
  onPrevious,
  onSeek,
  onSetVolume,
  playbackState,
}) => {
  const [showVolumeControls, setShowVolumeControls] = useState(false);
  const [showSeekControls, setShowSeekControls] = useState(false);
  const {position, duration} = useProgress();
  const sliderRef = useRef(null);

  const handleToggleVolumeControls = () => {
    setShowVolumeControls(!showVolumeControls);
  };

  const handleToggleSeekControls = () => {
    setShowSeekControls(!showSeekControls);
  };

  const handleSeekStart = () => {
    TrackPlayer.pause();
  };

  const handleSeekComplete = async value => {
    await onSeek(value);
    TrackPlayer.play();
  };

  const handleVolumeChange = async value => {
    await onSetVolume(value);
  };

  return (
    <Modal animationType="slide" transparent={true}>
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => setShowPlayer(false)}>
            <MaterialIcons name="keyboard-arrow-down" size={32} color="#000" />
          </TouchableOpacity>
          <Text style={styles.title}>{track.title}</Text>
          <TouchableOpacity onPress={() => {}}>
            <MaterialIcons name="more-vert" size={32} color="#000" />
          </TouchableOpacity>
        </View>
        <View style={styles.albumArtContainer}>
          <Image source={{uri: track.albumArt}} style={styles.albumArt} />
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.artist}>{track.artist}</Text>
        </View>
        {showSeekControls ? (
          <View style={styles.seekContainer}>
            <TouchableWithoutFeedback
              onPress={() => setShowSeekControls(false)}>
              <View style={styles.seekOverlay} />
            </TouchableWithoutFeedback>
            <View style={styles.seekSliderContainer}>
              <Slider
                ref={sliderRef}
                style={styles.seekSlider}
                minimumValue={0}
                maximumValue={duration}
                value={position}
                onSlidingStart={handleSeekStart}
                onSlidingComplete={handleSeekComplete}
                minimumTrackTintColor="#000"
                maximumTrackTintColor="#ccc"
              />
              <Text style={styles.seekTime}>
                {new Date(position * 1000).toISOString().substr(14, 5)}
              </Text>
              <Text style={styles.seekTime}>
                {new Date(duration * 1000).toISOString().substr(14, 5)}
              </Text>
            </View>
          </View>
        ) : (
          <View style={styles.controlsContainer}>
            <TouchableOpacity onPress={() => handleToggleSeekControls()}>
              <MaterialIcons name="access-time" size={24} color="#000" />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => onPrevious()}>
              <MaterialIcons name="skip-previous" size={40} color="#000" />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => onPlayPause()}>
              <MaterialIcons
                name={
                  playbackState === TrackPlayer.STATE_PLAYING
                    ? 'pause'
                    : 'play-arrow'
                }
                size={64}
                color="#000"
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => onSkip()}>
              <MaterialIcons name="skip-next" size={40} color="#000" />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleToggleVolumeControls()}>
              <MaterialIcons name="volume-up" size={24} color="#000" />
            </TouchableOpacity>
          </View>
        )}
        {showVolumeControls && (
          <View style={styles.volumeContainer}>
            <TouchableWithoutFeedback
              onPress={() => setShowVolumeControls(false)}>
              <View style={styles.volumeOverlay} />
            </TouchableWithoutFeedback>
            <Slider
              style={styles.volumeSlider}
              minimumValue={0}
              maximumValue={1}
              step={0.05}
              value={1}
              onValueChange={handleVolumeChange}
              minimumTrackTintColor="#000"
              maximumTrackTintColor="#ccc"
            />
          </View>
        )}
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingBottom: 30,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  albumArtContainer: {
    alignItems: 'center',
    marginTop: 40,
  },
  albumArt: {
    width: 300,
    height: 300,
  },
  infoContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  artist: {
    fontSize: 18,
  },
  controlsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginTop: 60,
  },
  seekContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: 200,
  },
  seekOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  seekSliderContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    paddingHorizontal: 20,
    paddingBottom: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  seekSlider: {
    flex: 1,
  },
  seekTime: {
    fontSize: 12,
    marginLeft: 5,
    color: '#fff',
  },
  volumeContainer: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  volumeOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  volumeSlider: {
    width: 200,
  },
});

export default Player;
