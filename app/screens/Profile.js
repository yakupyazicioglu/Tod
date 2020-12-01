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

export default class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: [],
    };
  }

  componentDidMount() {
    fetch('http://10.0.2.2:3005/getAllBooks')
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          dataSource: responseJson.data,
        });
      });
  }

  _renderItem = ({item}) => (
    <BookItem
      id={item.id}
      isbn={item.isbn}
      title={item.title}
      authors={item.authors}
      cover={item.cover}
      navigation={this.props.navigation}
    />
  );

  _keyExtractor = (item, index) => item.id.toString();

  render() {
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

            <Button transparent>
              <Icon
                name="md-add"
                onPress={() => this.props.navigation.navigate('AddBook', {})}
              />
            </Button>
            <Button
              transparent
              onPress={() => this.props.navigation.navigate('ScanBarcode', {})}>
              <Icon name="md-barcode" />
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
