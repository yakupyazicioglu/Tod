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
    });
  };

  return (
    <TouchableOpacity onPress={submitData}>
      <SafeAreaView style={styles.container}>
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
            </View>
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
    height: 120,
    width: Dev_Width,
    marginTop: 2,
    marginBottom: 2,
  },
  view: {
    height: '100%',
    width: '100%',
    flexDirection: 'row',
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
  bDetails: {
    marginLeft: '10%',
    width: '80%',
  },
  bTitle: {
    marginTop: 2,
    marginBottom: 2,
    width: '70%',
    fontWeight: 'bold',
    fontSize: 18,
  },
  aName: {
    marginTop: 2,
    marginBottom: 2,
  },
  bPointReview: {
    flexDirection: 'row',
  },
  bPointIcon: {
    marginTop: 4,
    marginBottom: 4,
  },
  bPointText: {
    marginLeft: 2,
  },
});

export default React.memo(BookItem);
