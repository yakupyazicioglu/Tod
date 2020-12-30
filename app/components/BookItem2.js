import React, {Component} from 'react';
import {
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  SafeAreaView,
  Image,
} from 'react-native';
import {ProgressBar} from 'react-native-paper';
import AntDesign from 'react-native-vector-icons/AntDesign';

const Dev_Height = Dimensions.get('window').height;
const Dev_Width = Dimensions.get('window').width;

class BookItem2 extends Component {
  submitData = () => {
    console.log('button pressed');
    this.props.navigation.navigate('BookDetails', {
      bId: this.props.bId,
      isbn: this.props.isbn,
      cover: this.props.cover,
      title: this.props.title,
      authors: this.props.authors,
      publisher: this.props.publisher,
    });
  };

  render() {
    return (
      <TouchableOpacity onPress={() => this.submitData()}>
        <SafeAreaView style={{height: 120, width: Dev_Width, marginTop: 8}}>
          <View
            style={{
              height: '20%',
              width: '100%',
              flexDirection: 'row',
              marginTop: '2%',
            }}>
            {/* Book cover view */}
            <View style={{height: 120, width: '20%', marginLeft: '7%'}}>
              <Image
                style={{height: '100%', width: '100%', borderRadius: 8}}
                source={{
                  uri: this.props.cover,
                }}
              />
            </View>

            {/* Book details view */}
            <View style={{width: '80%'}}>
              <Text
                numberOfLines={1}
                ellipsizeMode="tail"
                style={{
                  width: '70%',
                  marginLeft: '10%',
                  marginTop: '2%',
                  fontWeight: 'bold',
                  fontSize: 18,
                }}>
                {this.props.title}
              </Text>
              <Text style={{marginLeft: '10%'}}>
                {this.props.authors.aName}
              </Text>

              {/* Point and Review view */}
              <View style={{flexDirection: 'row', marginTop: '4%'}}>
                <AntDesign
                  name="star"
                  size={18}
                  color="#FFD700"
                  style={{marginLeft: '10%'}}
                />
                <Text style={{marginLeft: '2%'}}> {this.props.point} </Text>
                <Text style={{marginLeft: '2%', color: '#808080'}}>
                  ({this.props.review} Review)
                </Text>
              </View>
              <ProgressBar
                style={{
                  height: '15%',
                  width: 225,
                  marginLeft: '10%',
                  marginTop: '6%',
                }}
                progress={0.5}
                color="#7Fa1F8"
              />
            </View>
          </View>
        </SafeAreaView>
      </TouchableOpacity>
    );
  }
}

export default BookItem2;
