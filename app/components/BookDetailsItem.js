import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
  Image,
} from 'react-native';
import {Ionicons} from 'react-native-vector-icons/Ionicons';
import {ProgressBar} from 'react-native-paper';
import {Rating} from 'react-native-ratings';
import Button from '@ui-kitten/components';

const Dev_Height = Dimensions.get('window').height;
const Dev_width = Dimensions.get('window').width;

const genreDatas = [
  {
    gId: 'ccaffff5a32d420c',
    gName: 'Siir',
    gValue: 100,
  },
  {
    gId: 'ccaffff5a32d420c',
    gName: 'Roman',
    gValue: 100,
  },
  {
    gId: 'ccaffff5a32d420c',
    gName: 'Tarih',
    gValue: 100,
  },
];

class BookItem extends React.Component {
  render() {
    return (
      <SafeAreaView style={styles.container}>
        <View
          style={{
            height: '20%',
            width: '100%',
            flexDirection: 'row',
            marginTop: '2%',
          }}>
          <View style={{height: '180%', width: '40%', marginLeft: '7%'}}>
            <Image
              style={{height: '100%', width: '100%', borderRadius: 15}}
              source={{
                uri:
                  'https://i.idefix.com/cache/500x400-0/originals/0001778480001-1.jpg',
              }}
            />
          </View>

          <View>
            <FlatList
              data={genreDatas}
              renderItem={renderGenre}
              horizontal={true}
              style={{marginLeft: '12%'}}
            />
          </View>
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: Dev_Height,
    width: Dev_width,
    flexDirection: 'column',
  },
});
