import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {RNCamera} from 'react-native-camera';

const PendingView = () => (
  <View
    style={{
      flex: 1,
      backgroundColor: 'lightgreen',
      justifyContent: 'center',
      alignItems: 'center',
    }}>
    <Text>Waiting</Text>
  </View>
);

const takePicture = (camera) => {
  const options = {quality: 0.5, base64: true};
  const data = camera.takePictureAsync(options);
  //  eslint-disable-next-line
  console.log(data.uri);
};

function ScanBarcode({navigation}) {
  const [book, setBook] = useState('');

  const getBookByIsbn = (isbn) => {
    console.log('isbn: ' + isbn);
    isbn = '9786057572523';
    fetch('http://165.232.77.107:3003/isbn/' + isbn)
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
  return (
    <View style={styles.container}>
      <RNCamera
        style={styles.preview}
        type={RNCamera.Constants.Type.back}
        flashMode={RNCamera.Constants.FlashMode.on}
        androidCameraPermissionOptions={{
          title: 'Permission to use camera',
          message: 'We need your permission to use your camera',
          buttonPositive: 'Ok',
          buttonNegative: 'Cancel',
        }}
        onBarCodeRead={onBarCodeRead}>
        {({camera, status}) => {
          if (status !== 'READY') return <PendingView />;
          return (
            <View
              style={{
                flex: 0,
                flexDirection: 'row',
                justifyContent: 'center',
              }}>
              <TouchableOpacity
                onPress={() => takePicture(camera)}
                style={styles.capture}>
                <Text style={{fontSize: 14}}> SNAP </Text>
              </TouchableOpacity>
            </View>
          );
        }}
      </RNCamera>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'black',
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  capture: {
    flex: 0,
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 15,
    paddingHorizontal: 20,
    alignSelf: 'center',
    margin: 20,
  },
});

export default ScanBarcode;
