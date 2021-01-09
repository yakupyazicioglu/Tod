import React, {useState, useEffect, memo} from 'react';
import {
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  View,
} from 'react-native';
import {
  Container,
  Header,
  Left,
  Body,
  Right,
  Button,
  Subtitle,
  Icon,
  Title,
} from 'native-base';

import BookItem from '../components/BookItem';

function Discover({navigation}) {
  const [dataSource, setDataSource] = useState([]);
  //const memoizedValue = useMemo(() => renderItem, dataSource);

  useEffect(() => {
    fetch('http://165.232.77.107:3003/books')
      .then((response) => response.json())
      .then((responseJson) => {
        setDataSource(responseJson);
      });
  }, []);

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
      <FlatList
        data={dataSource}
        keyExtractor={keyExtractor}
        renderItem={renderBooks}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
});

export default Discover;
