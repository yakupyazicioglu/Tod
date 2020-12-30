import React, {useState, useEffect} from 'react';
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

import BookItem2 from '../components/BookItem2';

function Discover2({navigation}) {
  const [dataSource, setDataSource] = useState('');

  useEffect(() => {
    fetch(' ')
      .then((response) => response.json())
      .then((responseJson) => {
        setDataSource(responseJson);
      });
  });

  const renderItem = ({item}) => {
    <BookItem2
      bId={item.bId}
      isbn={item.isbn}
      title={item.title}
      authors={item.authors[0]}
      cover={item.cover}
      publisher={item.publisher}
    />;
  };

  const keyExtractor = (item, index) => {
    item.bId.toString();
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <Header>
        <Body>
          <Title>Kesfet</Title>
        </Body>
        <Right>
          <Button transparent>
            <Icon name="search" />
          </Button>
          <Button
            transparent
            onPress={() => navigation.navigate('ScanBarcode', {})}>
            <Icon name="md-barcode-outline" />
          </Button>
        </Right>
      </Header>
      <FlatList
        data={dataSource}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
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

export default Discover2;
