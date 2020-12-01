import React, {Component} from 'react';
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
//import DeviceInfo from 'react-native-device-info';

export default class Books extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: [],
      deviceId: '',
    };
  }

  /* getDeviceId = () => {
    //Getting the Unique Id from here
    var id = DeviceInfo.getUniqueID();
    this.setState({deviceId: id});
    console.log(this.deviceId);
  }; */

  componentDidMount() {
    fetch('http://192.168.1.136:3003/books')
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          dataSource: responseJson,
        });
      });
  }

  _renderItem = ({item}) => (
    <BookItem
      bId={item.bId}
      isbn={item.isbn}
      title={item.title}
      authors={item.authors[0]}
      cover={item.cover}
      publisher={item.publisher}
      navigation={this.props.navigation}
    />
  );

  _keyExtractor = (item, index) => item.bId.toString();

  render() {
    //this.getDeviceId();
    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" />
        <Header>
          <Body>
            <Title>Kutuphanem</Title>
          </Body>
          <Right>
            <Button transparent>
              <Icon name="search" />
            </Button>
            <Button
              transparent
              onPress={() => this.props.navigation.navigate('ScanBarcode', {})}>
              <Icon name="md-barcode-outline" />
            </Button>
          </Right>
        </Header>
        <FlatList
          data={this.state.dataSource}
          keyExtractor={this._keyExtractor}
          renderItem={this._renderItem}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
});
