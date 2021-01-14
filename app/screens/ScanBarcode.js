import React, {useState, useEffect} from 'react';
import {Text, View, StyleSheet, LogBox, Button} from 'react-native';
import {RNCamera} from 'react-native-camera';
import BarcodeMask from 'react-native-barcode-mask';
import Icon from 'react-native-vector-icons/Ionicons';
import {Item, Input} from 'native-base';

function ScanBarcode({navigation}) {
  const [book, setBook] = useState();
  const [barcode, setBarcode] = useState();

  useEffect(() => {
    LogBox.ignoreLogs(['Possible Unhandled Promise Rejection']);
  }, []);

  const getBookByIsbn = async (isbn) => {
    await fetch('http://165.232.77.107:3003/isbn/' + isbn)
      .then((response) => response.json())
      .then((responseJson) => {
        setBook(responseJson);
        setBarcode(book.title);
      });
  };

  const onBarCodeRead = (e) => {
    getBookByIsbn(e.data);
  };

  const onGetItemPress = () => {
    navigation.navigate('BookDetails', {
      bId: book.bId,
    });
  };

  const handleChange = () => {
    // handle user input
  };

  return (
    <View style={styles.container}>
      <View style={styles.upperSection}>
        <RNCamera
          style={styles.preview}
          type={RNCamera.Constants.Type.back}
          captureAudio={false}
          captureVideo={false}
          androidCameraPermissionOptions={{
            title: 'Permission to use camera',
            message: 'We need your permission to use your camera',
            buttonPositive: 'Ok',
            buttonNegative: 'Cancel',
          }}
          onBarCodeRead={onBarCodeRead}>
          <BarcodeMask
            edgeColor={'#62B1F6'}
            showAnimatedLine={false}
            outerMaskOpacity={0.8}
            edgeBorderWidth={1}
          />
        </RNCamera>
      </View>
      <View style={styles.lowerSection}>
        <Item>
          <Icon name="ios-barcode-sharp" size={24} color="#7FA1F8" />
          <Input
            placeholder="Barcode of the item"
            value={barcode}
            onChangeText={handleChange}
          />
        </Item>

        <Button title="Go to the book" onPress={onGetItemPress} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  bottomOverlay: {
    position: 'absolute',
    width: '100%',
    flex: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  upperSection: {
    flex: 1,
  },
  lowerSection: {
    paddingVertical: 30,
    paddingHorizontal: 20,
    backgroundColor: 'white',
  },
});

export default ScanBarcode;
