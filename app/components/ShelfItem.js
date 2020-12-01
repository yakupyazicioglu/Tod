import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Alert,
  Image,
  Text,
} from 'react-native';
import {Card, Body, CardItem, Button, Icon, Left, Right} from 'native-base';

export default class MaterialCard extends Component {
  handlerLongClick = () => {
    //handler for Long Click
    Alert.alert(' Button Long Pressed');
  };

  render() {
    return (
      <TouchableOpacity
        onPress={() =>
          this.props.navigation.navigate('ViewShelf', {
            id: this.props.id,
            name: this.props.name,
          })
        }
        onLongPress={() => this.handlerLongClick()}>
        <Card>
          <CardItem>
            <Body>
              <View style={styles.bodyContent}>
                <Text style={styles.title}>{this.props.name}</Text>
              </View>
            </Body>
          </CardItem>
        </Card>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingLeft: 10,
    paddingRight: 10,
    backgroundColor: '#FFF',
    flexWrap: 'nowrap',
    elevation: 3,
    borderRadius: 2,
    borderColor: '#CCC',
    borderWidth: 1,
    shadowOffset: {
      height: 2,
      width: -2,
    },
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 1.5,
    overflow: 'hidden',
  },
  rect: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cardItemImagePlace: {
    width: 40,
    height: 60,
    backgroundColor: '#ccc',
    padding: 4,
  },
  bodyContent: {
    height: 60,
    flex: 1,
    padding: 8,
  },
  title: {
    color: '#000',
    paddingBottom: 8,
    fontSize: 20,
    fontFamily: 'roboto-regular',
  },
  authors: {
    color: '#000',
    opacity: 0.5,
    fontSize: 12,
    fontFamily: 'roboto-regular',
    lineHeight: 16,
  },
  cardButtons: {
    flexDirection: 'row',
    fontSize: 14,
  },
});
