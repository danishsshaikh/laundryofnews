import React from 'react';
import {View, Text, FlatList, TouchableOpacity, StyleSheet} from 'react-native';

const TrackList = ({tracks, onPress}) => {
  const renderItem = ({item}) => (
    <TouchableOpacity onPress={() => onPress(item)}>
      <View style={styles.trackItem}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.artist}>{item.artist}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <FlatList
      data={tracks}
      renderItem={renderItem}
      keyExtractor={item => item.id.toString()}
    />
  );
};

const styles = StyleSheet.create({
  trackItem: {
    width: '90%',
    paddingVertical: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
  },
  artist: {
    fontSize: 16,
  },
});

export default TrackList;
