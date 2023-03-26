import React from 'react';
import {View, Text, TouchableOpacity, Image, StyleSheet} from 'react-native';
import {MaterialIcons} from '@expo/vector-icons';

const MiniPlayer = ({track, onPlayPause, onSkip, onPrevious}) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onPlayPause}>
        <Image source={{uri: track.albumArt}} style={styles.albumArt} />
      </TouchableOpacity>
      <View style={styles.infoContainer}>
        <Text style={styles.title}>{track.title}</Text>
        <Text style={styles.artist}>{track.artist}</Text>
      </View>
      <View style={styles.controlsContainer}>
        <TouchableOpacity onPress={onPrevious}>
          <MaterialIcons name="skip-previous" size={24} color="#000" />
        </TouchableOpacity>
        <TouchableOpacity onPress={onPlayPause}>
          <MaterialIcons
            name={
              playbackState === TrackPlayer.STATE_PLAYING
                ? 'pause'
                : 'play-arrow'
            }
            size={24}
            color="#000"
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={onSkip}>
          <MaterialIcons name="skip-next" size={24} color="#000" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    height: 60,
    paddingHorizontal: 10,
    borderTopWidth: 1,
    borderTopColor: '#ccc',
  },
  albumArt: {
    width: 40,
    height: 40,
    marginRight: 10,
  },
  infoContainer: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  artist: {
    fontSize: 14,
  },
  controlsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: 80,
  },
});

export default MiniPlayer;
