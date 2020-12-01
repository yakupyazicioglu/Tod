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
import ShelfItem from '../components/ShelfItem';
import DialogInput from 'react-native-dialog-input';

export default class Shelves extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: [],
      isDialogVisible: false,
      addShelfName: '',
      selectedShelf: '',
    };
  }

  componentDidMount() {
    fetch('http://10.0.2.2:3005/getUserShelves')
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          dataSource: responseJson.data,
        });
      });
  }

  postShelf() {
    var data = {
      name: this.state.addShelfName,
    };
    fetch('http://10.0.2.2:3005/addShelf', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((responseJson) => {
        console.log(responseJson.status);
        this.setDialogVisible(false);
        this.componentDidMount();
        return responseJson.status;
      })
      .catch((error) => {
        console.error(error);
      });
  }

  deleteShelf() {
    var data = {
      name: this.state.selectedShelf,
    };
    fetch('http://10.0.2.2:3005/deleteShelf', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((responseJson) => {
        console.log(responseJson.status);
        this.setDialogVisible(false);
        this.componentDidMount();
        return responseJson.status;
      })
      .catch((error) => {
        console.error(error);
      });
  }

  _renderItem = ({item}) => (
    <ShelfItem
      id={item.id}
      name={item.name}
      navigation={this.props.navigation}
    />
  );

  _keyExtractor = (item, index) => item.id.toString();

  setDialogVisible(visible) {
    this.setState({isDialogVisible: visible});
  }

  render() {
    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" />
        <Header>
          <Body>
            <Title>Kutuphanem</Title>
          </Body>
          <View>
            <DialogInput
              isDialogVisible={this.state.isDialogVisible}
              title={'Create a Shelf'}
              hintInput={'Shelf Name'}
              submitInput={(inputText) => {
                this.state.addShelfName = inputText;
                //this.state.selectedShelf = this.state.dataSource[1].id;
                //this.deleteShelf();
                this.postShelf();
              }}
              closeDialog={() => {
                this.setDialogVisible(false);
              }}
            />
          </View>
          <Right>
            <Button transparent>
              <Icon name="search" />
            </Button>
            <Button transparent>
              <Icon
                name="md-add"
                onPress={() => {
                  this.setDialogVisible(!this.state.isDialogVisible);
                }}
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
          extraData={this.state}
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
