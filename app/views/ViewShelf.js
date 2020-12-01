import React, {Component} from 'react';
import {StyleSheet, Text, View, Image, StatusBar} from 'react-native';
import {
  Container,
  Header,
  Left,
  Body,
  Right,
  Subtitle,
  Button,
  Icon,
  Title,
} from 'native-base';
import DialogInput from 'react-native-dialog-input';

export default class ViewShelf extends Component {
  constructor(props) {
    super(props);
    const {navigation} = this.props;
    this.state = {
      id: navigation.state.params.id,
      name: navigation.state.params.name,
      shelf_name: '',
      isDialogVisible: false,
      dataSource: [],
    };
  }

  setDialogVisible(visible) {
    this.setState({isDialogVisible: visible});
  }

  render() {
    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" />
        <Header>
          <Body>
            <Title>{this.state.name}</Title>
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
                name="md-trash"
                onPress={() => {
                  this.setDialogVisible(!this.state.isDialogVisible);
                }}
              />
            </Button>
          </Right>
        </Header>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
  title: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  thumbnail: {
    flex: 1,
    height: 350,
    width: 150,
  },
});
