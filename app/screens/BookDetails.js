import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  Button,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
  Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {ProgressBar} from 'react-native-paper';
import {Rating} from 'react-native-ratings';
//import Button from '@ui-kitten/components';

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

function BookDetails({route}) {
  const {
    bId,
    cover,
    title,
    authors,
    publisher,
    published,
    summary,
  } = route.params;

  const renderGenre = ({item}) => (
    <Button
      key={item.gValue}
      style={{marginHorizontal: 4, borderRadius: 16, marginTop: '4%'}}
      size="tiny"
      title={item.gName}
    />
  );

  const keyExtractor = (item) => {
    return item.bId;
  };

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
              uri: cover,
            }}
          />
        </View>

        <View>
          <Text
            numberOfLines={3}
            style={{
              width: '40%',
              marginLeft: '10%',
              marginTop: '5%',
              fontWeight: 'bold',
              fontSize: 16,
            }}>
            {' '}
            {title}
          </Text>
          <Text style={{marginLeft: '10%', marginTop: '8%', fontSize: 12}}>
            {' '}
            {authors.aName}{' '}
          </Text>

          <Text style={{marginLeft: '10%', marginTop: '8%', fontSize: 10}}>
            {' '}
            {publisher}
          </Text>

          <Text style={{marginLeft: '10%', marginTop: '8%', fontSize: 10}}>
            {' '}
            {published}
          </Text>

          <View
            style={{
              flexDirection: 'row',
              marginTop: '4%',
              marginLeft: '15%',
            }}></View>
          <View>
            <FlatList
              data={genreDatas}
              renderItem={renderGenre}
              keyExtractor={keyExtractor}
              horizontal={true}
              style={{marginLeft: '12%'}}
            />
          </View>
        </View>
      </View>

      <View style={{height: '20%', width: '90%', marginTop: '25%'}}>
        <View>
          <ProgressBar
            style={{
              height: '10%',
              width: '90%',
              marginLeft: '10%',
              marginTop: '8%',
            }}
            progress={0.2}
            color="#7Fa1F8"
          />
          <Rating
            style={{paddingVertical: 10, marginTop: '6%'}}
            type="star"
            imageSize={20}
            ratingCount={10}
            ratingColor="#3498db"
            ratingBackgroundColor="#c8c7c8"
          />
        </View>
        <Text
          style={{
            marginLeft: '10%',
            marginTop: '4%',
            fontSize: 12,
          }}>
          {summary}
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
    height: Dev_Height,
    width: Dev_width,
  },
});

export default BookDetails;
