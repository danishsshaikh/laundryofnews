import React from 'react';
import {View, Text, FlatList, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {Ionicons} from '@expo/vector-icons';
import {useAtom} from 'jotai';
import {trackAtom} from '../atoms/trackAtom1';

const tracks = [
  {
    id: '1',
    title: 'Track 1',
    artist: 'Artist 1',
    artwork: require('../assets/banner1.jpg'),
    url: require('../assets/m1.mp3'),
  },
  {
    id: '2',
    title: 'Track 2',
    artist: 'Artist 2',
    artwork: require('../assets/banner2.jpg'),
    url: require('../assets/m2.mp3'),
  },
  // add more tracks here
];

export default function TrackListScreen() {
  const navigation = useNavigation();
  const [, setTrack] = useAtom(trackAtom);

  const handlePlay = item => {
    setTrack(item);
    navigation.navigate('Player');
  };

  const renderItem = ({item}) => (
    <TouchableOpacity onPress={() => handlePlay(item)} style={{padding: 10}}>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <Ionicons name="musical-notes-outline" size={24} color="#555" />
        <View style={{marginLeft: 10}}>
          <Text style={{fontSize: 16}}>{item.title}</Text>
          <Text style={{fontSize: 12, color: '#aaa'}}>{item.artist}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
      <FlatList
        data={tracks}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
    </View>
  );
}
