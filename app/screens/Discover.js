import React, {useState, useEffect, memo} from 'react';
import {
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  Text,
  FlatList,
  View,
} from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';
import BookItem from '../components/BookItem';

function Discover({navigation}) {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    fetch('http://165.232.77.107:3003/books')
      .then((response) => response.json())
      .then((responseJson) => {
        setBooks(responseJson);
      });
  }, []);

  const scanBarcode = () => {
    navigation.navigate('ScanBarcode');
  };

  const renderBooks = ({item}) => (
    <BookItem
      bId={item.bId}
      isbn={item.isbn}
      title={item.title}
      authors={item.authors[0]}
      cover={item.cover}
      publisher={item.publisher}
      book={item}
    />
  );

  const keyExtractor = (item) => {
    return item.bId;
  };

  return (
    <View style={styles.container}>
      {/* Header view */}
      <StatusBar translucent backgroundColor={'#7FA1F8'} />
      <View
        style={{
          height: '7%',
          width: '100%',
          flexDirection: 'row',
          alignItems: 'center',
          marginTop: '5%',
        }}>
        <Text
          style={{
            fontSize: 20,
            fontWeight: 'bold',
            marginLeft: '7%',
            color: '#7FA1F8',
          }}>
          Tod's books
        </Text>

        <TouchableOpacity style={{marginLeft: '45%'}}>
          <Icon name="ios-search" size={24} color="#7FA1F8" />
        </TouchableOpacity>

        <TouchableOpacity style={{marginLeft: '4%'}} onPress={scanBarcode}>
          <Icon name="ios-barcode-sharp" size={24} color="#7FA1F8" />
        </TouchableOpacity>
      </View>
      <FlatList
        data={books}
        keyExtractor={keyExtractor}
        renderItem={renderBooks}
        showsVerticalScrollIndicator={false}
        ItemSeparatorComponent={() => (
          <View style={{height: 2, backgroundColor: '#F5FCFF'}} />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
    marginTop: '2%',
  },
});

export default Discover;
