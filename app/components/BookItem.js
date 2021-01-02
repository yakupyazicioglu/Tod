import React from 'react';
import {
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Image,
} from 'react-native';
import {ProgressBar} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
import AntDesign from 'react-native-vector-icons/AntDesign';

const Dev_Height = Dimensions.get('window').height;
const Dev_Width = Dimensions.get('window').width;

function BookItem(props) {
  const navigation = useNavigation();
  const submitData = () => {
    navigation.navigate('BookDetails', {
      bId: props.bId,
      isbn: props.isbn,
      cover: props.cover,
      title: props.title,
      authors: props.authors,
      publisher: props.publisher,
    });
  };

  return (
    <TouchableOpacity onPress={submitData}>
      <SafeAreaView style={styles.sView}>
        <View style={styles.view}>
          {/* Book cover view */}
          <View style={styles.bView}>
            <Image
              style={styles.bCover}
              source={{
                uri: props.cover,
              }}
            />
          </View>

          {/* Book details view */}
          <View style={styles.bDetails}>
            <Text numberOfLines={1} ellipsizeMode="tail" style={styles.bTitle}>
              {props.title}
            </Text>
            <Text style={styles.aName}>{props.authors.aName}</Text>

            {/* Point and Review view */}
            <View style={styles.bPointReview}>
              <AntDesign
                name="star"
                size={18}
                color="#FFD700"
                style={styles.bPointIcon}
              />
              <Text style={styles.bPointText}> {props.point} </Text>
              <Text style={styles.bReviewText}>({props.review} Review)</Text>
            </View>
            <ProgressBar
              style={styles.bProgress}
              progress={0.5}
              color="#7Fa1F8"
            />
          </View>
        </View>
      </SafeAreaView>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
  bDetails: {
    width: '80%',
  },
  bTitle: {
    width: '70%',
    marginLeft: '10%',
    marginTop: '2%',
    fontWeight: 'bold',
    fontSize: 18,
  },
  bView: {
    height: 120,
    width: '20%',
    marginLeft: '7%',
  },
  bCover: {
    height: '100%',
    width: '100%',
    borderRadius: 8,
  },
  bPointReview: {
    flexDirection: 'row',
    marginTop: '4%',
  },
  bPointIcon: {
    marginLeft: '10%',
  },
  bPointText: {
    marginLeft: '2%',
  },
  bReviewText: {
    marginLeft: '2%',
    color: '#808080',
  },
  bProgress: {
    height: '15%',
    width: 225,
    marginLeft: '10%',
    marginTop: '6%',
  },
  aName: {
    marginLeft: '10%',
  },
  view: {
    height: '20%',
    width: '100%',
    flexDirection: 'row',
    marginTop: '2%',
  },
  sView: {
    height: 120,
    width: Dev_Width,
    marginTop: 8,
  },
});

export default React.memo(BookItem);
