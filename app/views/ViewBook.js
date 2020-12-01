import React, {Component} from 'react';
import {StyleSheet, Text, View, StatusBar, Image} from 'react-native';
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

export default class ViewBook extends Component {
  constructor(props) {
    super(props);
    const {navigation} = this.props;
    this.state = {
      bId: navigation.state.params.bId,
      dataSource: [],
    };
  }

  componentDidMount() {
    fetch('http://192.168.1.136:3003/book/' + this.state.bId)
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          dataSource: responseJson,
        });
      });
  }

  addBooktoUserLibrary() {}

  render() {
    const bookItem = this.state.dataSource;
    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" />
        <Header>
          <Body>
            <Title>{bookItem.title}</Title>
          </Body>
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
          </Right>
        </Header>
        <Text style={styles.title}>{this.state.title}</Text>
        <Image
          source={{
            uri: bookItem.cover,
          }}
          style={styles.thumbnail}
          resizeMode="contain"
        />
        <Button
          title="Add My Library"
          onPress={() => this.props.navigation.navigate('Tabs')}
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
