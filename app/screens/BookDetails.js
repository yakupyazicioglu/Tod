import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  BackHandler,
  FlatList,
  SafeAreaView,
  Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {Button} from 'native-base';
import {ProgressBar} from 'react-native-paper';
import {Rating} from 'react-native-ratings';
import Divider from '../components/DividerItem';

const Dev_Height = Dimensions.get('window').height;
const Dev_width = Dimensions.get('window').width;

function BookDetails({route, navigation}) {
  const [book, setBook] = useState('');
  const {bId} = route.params;
  //console.log('book: ' + JSON.stringify(book));

  const getBookById = () => {
    console.log('bookId: ' + bId);
    fetch('http://165.232.77.107:3003/book/' + bId)
      .then((response) => response.json())
      .then((responseJson) => {
        setBook(responseJson);
      });
  };

  useEffect(() => {
    fetch('http://165.232.77.107:3003/book/' + bId)
      .then((response) => response.json())
      .then((responseJson) => {
        setBook(responseJson);
      });

    const backAction = () => {
      navigation.navigate('Discover');
      return true;
    };
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, []);

  const renderGenre = ({item}) => (
    <Button rounded small warning style={{margin: 2}}>
      <Text style={{fontSize: 12, padding: 2}}>{item.gName}</Text>
    </Button>
  );

  const renderAuthor = ({item}) => (
    <Text numberOfLines={2} style={{fontSize: 16}}>
      {item.aName}
    </Text>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header view */}
      <View style={styles.header}>
        <TouchableOpacity
          style={{marginLeft: '6%'}}
          onPress={() => navigation.navigate('Discover')}>
          <Icon name="ios-arrow-back-sharp" size={32} color="#7FA1F8" />
        </TouchableOpacity>

        <TouchableOpacity style={{marginLeft: '75%'}}>
          <Icon name="ios-barcode-sharp" size={24} color="#7FA1F8" />
        </TouchableOpacity>
      </View>

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
            {book.title}
          </Text>

          <View style={styles.bookAuthor}>
            <FlatList
              data={book.authors}
              renderItem={renderAuthor}
              keyExtractor={(item) => item.aId}
              horizontal={false}
            />
          </View>

          <Text style={styles.bookPublisher}>{book.publisher}</Text>

          <Text style={styles.publishDate}>{book.publishDate}</Text>

          <View style={styles.bookGenres}>
            <FlatList
              data={book.genres}
              renderItem={renderGenre}
              keyExtractor={(item) => item.gId}
              horizontal={false}
              numColumns={2}
              showsHorizontalScrollIndicator={false}
              style={{
                flexWrap: 'wrap',
                alignContent: 'center',
              }}
            />
          </View>
        </View>
      </View>

      {/* Book progress and summary view */}
      <View style={styles.bookProgSumView}>
        <View>
          <ProgressBar
            style={styles.bookProgress}
            progress={book.progress}
            color="#7Fa1F8"
          />
          <Rating
            style={styles.bookRating}
            type="star"
            imageSize={30}
            ratingCount={10}
            ratingColor="#3498db"
            ratingBackgroundColor="#c8c7c8"
          />
        </View>
        <Text style={styles.bookSummary}>{book.summary}</Text>
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
    marginTop: '2%',
  },
  header: {
    height: '7%',
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: '5%',
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
    marginLeft: '10%',
    width: '60%',
  },
  bookTitle: {
    marginTop: '4%',
    marginRight: '4%',
    fontWeight: 'bold',
    fontSize: 18,
  },
  bookAuthor: {
    height: '30%',
    marginTop: '4%',
    marginRight: '4%',
    flexDirection: 'row',
  },
  bookPublisher: {
    height: '20%',
    marginTop: '4%',
    marginRight: '4%',
    fontSize: 12,
  },
  publishDate: {
    height: '20%',
    marginTop: '4%',
    fontSize: 12,
  },
  bookGenres: {
    flexDirection: 'row',
    marginTop: '4%',
  },
  bookProgSumView: {
    height: '20%',
    width: '90%',
    marginTop: '25%',
  },
  bookRating: {
    paddingVertical: 10,
    marginLeft: '10%',
  },
  bookProgress: {
    height: '10%',
    width: '90%',
    marginLeft: '10%',
    marginTop: '8%',
  },
  bookSummary: {
    marginLeft: '10%',
    marginTop: '4%',
    fontSize: 12,
  },
});

export default BookDetails;
