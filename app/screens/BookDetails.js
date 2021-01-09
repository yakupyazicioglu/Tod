import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
  Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {Button} from 'native-base';
import {ProgressBar} from 'react-native-paper';
import {Rating} from 'react-native-ratings';

const Dev_Height = Dimensions.get('window').height;
const Dev_width = Dimensions.get('window').width;

function BookDetails({route}) {
  const [book, setBook] = useState('');
  const {bId} = route.params;
  //console.log('book: ' + JSON.stringify(book));

  useEffect(() => {
    fetch('http://165.232.77.107:3003/book/' + bId)
      .then((response) => response.json())
      .then((responseJson) => {
        setBook(responseJson);
      });
  }, []);

  const renderGenre = ({item}) => (
    <Button rounded small warning style={{margin: 2}}>
      <Text style={{fontSize: 12, margin: 2, padding: 2}}>{item.gName}</Text>
    </Button>
  );

  const renderAuthor = ({item}) => (
    <Button rounded small transparent style={{margin: 2}}>
      <Text style={{fontSize: 12, margin: 2, padding: 2}}>{item.aName}</Text>
    </Button>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Book contents view */}
      <View style={styles.bookContents}>
        {/* Book cover view */}
        <View style={styles.bookCover}>
          <Image
            style={{height: '100%', width: '100%', borderRadius: 15}}
            source={{
              uri: book.cover,
            }}
          />
        </View>

        {/* Book details view */}
        <View style={styles.bookDetails}>
          <Text numberOfLines={3} style={styles.bookTitle}>
            {' '}
            {book.title}
          </Text>
          <View style={styles.bookAuthor}>
            <FlatList
              data={book.authors}
              renderItem={renderAuthor}
              keyExtractor={(item) => item.aId}
              horizontal={true}
              style={{marginLeft: '8%'}}
            />
          </View>

          <Text style={styles.bookPublisher}> {book.publisher}</Text>

          <Text style={styles.publishDate}> {book.publishDate}</Text>

          <View style={styles.bookGenres}>
            <FlatList
              data={book.genres}
              renderItem={renderGenre}
              keyExtractor={(item) => item.gId}
              horizontal={true}
              style={{
                marginLeft: '8%',
                flexWrap: 'wrap',
                alignContent: 'center',
              }}
            />
          </View>
        </View>
      </View>

      {/* Book progress and summary view */}
      <View style={{height: '20%', width: '90%', marginTop: '25%'}}>
        <View>
          <ProgressBar
            style={{
              height: '10%',
              width: '90%',
              marginLeft: '10%',
              marginTop: '8%',
            }}
            progress={book.progress}
            color="#7Fa1F8"
          />
          <Rating
            style={{paddingVertical: 10, marginTop: '6%'}}
            type="star"
            imageSize={20}
            ratingCount={10}
            ratingColor="#3498db"
            ratingBackgroundColor="#c8c7c8"
          />
        </View>
        <Text
          style={{
            marginLeft: '10%',
            marginTop: '4%',
            fontSize: 12,
          }}>
          {book.summary}
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    backgroundColor: '#F5FCFF',
    height: Dev_Height,
    width: Dev_width,
  },
  bookContents: {
    height: '20%',
    width: '100%',
    flexDirection: 'row',
    marginTop: '2%',
  },
  bookCover: {
    height: '180%',
    width: '40%',
    marginLeft: '7%',
  },
  bookDetails: {
    flex: 1,
    flexDirection: 'column',
    width: '60%',
  },
  bookTitle: {
    height: '40%',
    marginLeft: '10%',
    marginTop: '5%',
    fontWeight: 'bold',
    fontSize: 16,
  },
  bookAuthor: {
    height: '20%',
    flexDirection: 'row',
    marginLeft: '4%',
  },
  bookPublisher: {
    height: '20%',
    marginLeft: '9%',
    marginTop: '2%',
    fontSize: 10,
  },
  publishDate: {
    height: '20%',
    marginLeft: '9%',
    marginTop: '2%',
    fontSize: 10,
  },
  bookGenres: {
    height: '20%',
    flexDirection: 'row',
    marginTop: '4%',
    marginLeft: '4%',
  },
});

export default BookDetails;
