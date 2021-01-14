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
  ScrollView,
  LogBox,
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
  const [loading, setLoading] = useState(true);
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

    LogBox.ignoreLogs(['VirtualizedLists should never be nested']);

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
    <Text numberOfLines={2} style={{fontSize: 16, padding: 2}}>
      {item.aName}
    </Text>
  );

  const ratingCompleted = (rating) => {
    console.log('Rating is: ' + rating);
  };

  const scanBarcode = () => {
    navigation.navigate('ScanBarcode');
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header view */}
      <View style={styles.header}>
        <TouchableOpacity
          style={{marginLeft: '6%'}}
          onPress={() => navigation.navigate('Discover')}>
          <Icon name="ios-arrow-back-sharp" size={32} color="#7FA1F8" />
        </TouchableOpacity>

        <TouchableOpacity style={{marginLeft: '75%'}} onPress={scanBarcode}>
          <Icon name="ios-barcode-sharp" size={24} color="#7FA1F8" />
        </TouchableOpacity>
      </View>
      <ScrollView style={styles.scrollView}>
        {/* Book contents view */}
        <View style={styles.bookContents}>
          {/* Book cover view */}
          <View style={styles.bookCover}>
            <Image
              style={styles.bookImg}
              source={{
                uri: book.cover,
              }}
            />
          </View>

          {/* Book details view */}
          <View style={styles.bookDetails}>
            <Text numberOfLines={4} style={styles.bookTitle}>
              {book.title}
            </Text>

            <View style={styles.bookAuthor}>
              <FlatList
                data={book.authors}
                renderItem={renderAuthor}
                keyExtractor={(item) => item.aId}
                horizontal={false}
                numColumns={2}
                showsHorizontalScrollIndicator={false}
              />
            </View>

            <Text style={styles.bookPublisher}>{book.publisher}</Text>

            <Text style={styles.publishDate}>{book.publishDate}</Text>

            <Text style={styles.publishDate}>{book.isbn}</Text>

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
              startingValue={0}
              showRating
              onStartRating={ratingCompleted}
              tintColor="#7Fa1F8"
            />
          </View>
          <Text style={styles.bookSummary}>{book.summary}</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
    height: Dev_Height,
    width: Dev_width,
  },
  scrollView: {
    flex: 1,
    marginBottom: 0,
  },
  header: {
    height: '7%',
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: '4%',
    marginBottom: 4,
  },
  bookContents: {
    height: 300,
    width: '100%',
    flexDirection: 'row',
  },
  bookCover: {
    height: 300,
    width: '45%',
    marginLeft: '6%',
  },
  bookImg: {
    height: '100%',
    width: '100%',
    borderRadius: 15,
  },
  bookDetails: {
    flex: 1,
    flexDirection: 'column',
    marginLeft: '4%',
    height: 300,
    width: '55%',
  },
  bookTitle: {
    marginTop: 4,
    marginBottom: 4,
    fontWeight: 'bold',
    fontSize: 18,
  },
  bookAuthor: {
    marginTop: 4,
    marginBottom: 4,
    flexDirection: 'row',
  },
  bookPublisher: {
    marginTop: 8,
    marginBottom: 8,
    fontSize: 12,
  },
  publishDate: {
    marginTop: 8,
    marginBottom: 8,
    fontSize: 12,
  },
  bookGenres: {
    flexDirection: 'row',
    marginTop: 12,
  },
  bookProgSumView: {
    height: '100%',
    width: '90%',
    marginTop: 18,
  },
  bookRating: {
    paddingVertical: 10,
    marginLeft: '10%',
  },
  bookProgress: {
    height: 4,
    width: '90%',
    marginLeft: '10%',
  },
  bookSummary: {
    width: '90%',
    height: '100%',
    marginLeft: '10%',
    marginRight: '10%',
    marginTop: 4,
    marginBottom: 4,
    fontSize: 14,
  },
});

export default BookDetails;
