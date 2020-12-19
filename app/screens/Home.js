import React, {Component} from 'react';
import {
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
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
import BookItem from '../components/BookItem2';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Dev_Height = Dimensions.get('window').height;
const Dev_width = Dimensions.get('window').width;

export default class Books extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: [],
    };
  }

  componentDidMount() {
    fetch('http://165.232.77.107:3003/books')
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
        <Header style={{backgroundColor: 'transparent'}}>
          <Left>
            <Button
              transparent
              onPress={() => this.props.navigation.navigate('ScanBarcode', {})}>
              <Ionicons name="ios-menu" size={32} color="#7FA1F8" />
            </Button>
          </Left>
          <Body>
            <Title>Tod</Title>
          </Body>
          <Right>
            <Button
              transparent
              onPress={() => this.props.navigation.navigate('ScanBarcode', {})}>
              <Ionicons name="ios-search" size={24} color="#7FA1F8" />
            </Button>
            <Button
              transparent
              onPress={() => this.props.navigation.navigate('ScanBarcode', {})}>
              <Ionicons name="ios-barcode-sharp" size={24} color="#7FA1F8" />
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
    height: Dev_Height,
    width: Dev_width,
  },
});
