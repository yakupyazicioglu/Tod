import React, {Component} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Alert,
  TouchableOpacity,
  Image,
} from 'react-native';
import {RNCamera} from 'react-native-camera';

export default class ScanBarcode extends Component {
  constructor(props) {
    super(props);
    this.handleTourch = this.handleTourch.bind(this);
    this.state = {
      torchOn: false,
    };
  }
  onBarCodeRead = (e) => {
    //Alert.alert('Barcode value is' + e.data, 'Barcode type is' + e.type);
    this.props.navigation.navigate('AddBook', {
      isbn: e.data,
    });
  };
  render() {
    return (
      <View style={styles.container}>
        <RNCamera
          style={styles.preview}
          flashMode={
            this.state.torchOn
              ? RNCamera.Constants.FlashMode.on
              : RNCamera.Constants.FlashMode.off
          }
          androidCameraPermissionOptions={{
            title: 'Permission to use camera',
            message: 'We need your permission to use your camera',
            buttonPositive: 'Ok',
            buttonNegative: 'Cancel',
          }}
          onBarCodeRead={this.onBarCodeRead}
          ref={(cam) => (this.camera = cam)}>
          <Text
            style={{
              backgroundColor: 'white',
            }}>
            BARCODE SCANNER
          </Text>
        </RNCamera>
        <View style={styles.bottomOverlay}>
          <TouchableOpacity
            onPress={() => this.handleTourch(this.state.torchOn)}>
            <Image style={styles.cameraIcon} />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
  handleTourch(value) {
    if (value === true) {
      this.setState({torchOn: false});
    } else {
      this.setState({torchOn: true});
    }
  }
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
