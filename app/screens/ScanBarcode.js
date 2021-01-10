import React, {useState} from 'react';
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
import {RNCamera} from 'react-native-camera';

function ScanBarcode({navigation}) {
  const [torch, setTorch] = useState(false);
  const [book, setBook] = useState();

  const getBookByIsbn = async (isbn) => {
    await fetch('http://165.232.77.107:3003/isbn/' + isbn)
      .then((response) => response.json())
      .then((responseJson) => {
        setBook(responseJson);
      });
    navigation.navigate('BookDetails', {
      bId: book.bId,
    });
  };

  const onBarCodeRead = (e) => {
    //Alert.alert('Barcode value is' + e.data, 'Barcode type is' + e.type);
    getBookByIsbn(e.data);
  };

  const handleTourch = (value) => {
    if (value === true) {
      setTorch(false);
    } else {
      setTorch(true);
    }
  };

  return (
    <View style={styles.container}>
      <RNCamera
        style={styles.preview}
        type={RNCamera.Constants.Type.back}
        flashMode={
          torch
            ? RNCamera.Constants.FlashMode.on
            : RNCamera.Constants.FlashMode.off
        }
        androidCameraPermissionOptions={{
          title: 'Permission to use camera',
          message: 'We need your permission to use your camera',
          buttonPositive: 'Ok',
          buttonNegative: 'Cancel',
        }}
        onBarCodeRead={onBarCodeRead}>
        <Text
          style={{
            backgroundColor: 'white',
          }}>
          Scan Barcode
        </Text>
      </RNCamera>
      <View style={styles.bottomOverlay}>
        <TouchableOpacity onPress={() => handleTourch(torch)}>
          <Image style={styles.cameraIcon} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  cameraIcon: {
    margin: 5,
    height: 40,
    width: 40,
  },
  bottomOverlay: {
    position: 'absolute',
    width: '100%',
    flex: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default ScanBarcode;
