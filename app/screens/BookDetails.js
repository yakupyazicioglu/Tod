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

export default class BookDetails extends React.Component {
  renderGenre = ({item}) => (
    <Button
      key={item.gValue}
      style={{marginHorizontal: 4, borderRadius: 16, marginTop: '4%'}}
      size="tiny"
      title={item.gName}></Button>
  );
  render() {
    return (
      <SafeAreaView style={styles.container}>
        <View
          style={{
            height: '7%',
            width: '100%',
            flexDirection: 'row',
            alignItems: 'center',
            marginTop: '5%',
          }}>
          <TouchableOpacity style={{marginLeft: '8%'}}>
            <Ionicons name="ios-menu" size={32} color="#7FA1F8" />
          </TouchableOpacity>

          <TouchableOpacity style={{marginLeft: '60%'}}>
            <Ionicons name="ios-search" size={24} color="#7FA1F8" />
          </TouchableOpacity>

          <TouchableOpacity style={{marginLeft: '4%'}}>
            <Ionicons name="ios-barcode-sharp" size={24} color="#7FA1F8" />
          </TouchableOpacity>
        </View>

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
            <Text
              style={{
                marginLeft: '10%',
                marginTop: '5%',
                fontWeight: 'bold',
                fontSize: 16,
              }}>
              {' '}
              The Blue Bear
            </Text>
            <Text style={{marginLeft: '10%', marginTop: '8%', fontSize: 12}}>
              {' '}
              Tesa Stevens{' '}
            </Text>

            <Text style={{marginLeft: '10%', marginTop: '8%', fontSize: 10}}>
              {' '}
              İş Bankası Kültür Yayınları{' '}
            </Text>

            <Text style={{marginLeft: '10%', marginTop: '8%', fontSize: 10}}>
              {' '}
              2016{' '}
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
                renderItem={this.renderGenre}
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
            Ailesinin tek çocuğu olan Pyotr Andreyiçin yazgısı daha doğduğu gün
            belli olmuştur. Çariçenin ordusunda asker olarak hizmet etmek.
            Sessiz ve sakin küçük bir taşra kalesine atanan Asteğmen Pyotr
            Andreyiç, kalenin komutanın kızı Marya Ivanovaya aşık olur ve tam
            her şey yoluna girmek üzereyken bir Kazak isyanı baş gösterir. İki
            sevgilinin yolları ayrılır ve Pyotr Andreyiç sevdiği kıza kavuşmak
            için her şeyi yapmaya hazırdır. Ucunda ölüm olsa bile! (Tanıtım
            Bülteninden)  
          </Text>
        </View>
      </SafeAreaView>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
    height: Dev_Height,
    width: Dev_width,
  },
});
