import React, { Component } from 'react';
import { Text, View, Modal } from 'react-native';
import { connect } from "react-redux";

import Slider from '@react-native-community/slider';
import { RNCamera } from 'react-native-camera';

import styles from './barCodeScannerScreenStyles';
import { barCodeScannerScreenOptions } from './barCodeScannerScreenOptions';

import ClickableElement from '../../components/UI/ClickableElement/ClickableElement';
import DsproIcons from '../../components/UI/DsproIcons/DsproIcons';
import CustomHeader from '../../components/UI/CustomHeader/CustomHeader';
import gotoScreen from '../../components/UI/GotoScreen/gotoScreen';


import { saveBarCode } from "../../store/actions/index";

class BarCodeScannerScreen extends Component{

  constructor(props) {
    super(props);
    this.state = {
      camera: {
        type: RNCamera.Constants.Type.back,
      	flashMode: RNCamera.Constants.FlashMode.auto,
      	barcodeFinderVisible: true
      },
      modalVisible: false
    };
    this.camera = null;
    this.barcode = "";

  };

  static options(){
    return barCodeScannerScreenOptions;
  };

  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  };

  onBarCodeRead(scanResult) {

    console.warn(scanResult.type);
    console.warn(scanResult.data);
    if (scanResult.data != null) {
  	  this.barcode = scanResult.data;
      this.setModalVisible(true);
      console.log("this.barcodes ",this.barcode);
  	  console.warn('onBarCodeRead call');
    }
    return;
  }

  async takePicture() {
    if (this.camera) {
      const options = { quality: 0.5, base64: true };
      const data = await this.camera.takePictureAsync(options);
      console.log(data.uri);
    }
  }

  render() {
    const leftMenuIconButton = <ClickableElement
                                  inner={
                                    <View style={styles.buttonContainer}>
                                      <DsproIcons
                                          icon="arrowLeft"
                                          width={22}
                                          height={22}
                                          color="teal"
                                          strokeColor="teal"
                                          fillColor="teal"
                                          strokeWidth={0.5} />
                                    </View>
                                  }
                                  onPress={() => gotoScreen(this.props.componentId, 'liftApp.WelcomeScreen')}
                                />;
    return (
      <View style={styles.container}>
        <CustomHeader
            background="teal"
            topBorder={false}
            centerBlock={<Text style={styles.scanScreenMessage}>Please scan the barcode.</Text>}
            leftBlock={ leftMenuIconButton } />
        <RNCamera
            ref={ref => {
              this.camera = ref;
            }}
            barcodeFinderVisible={this.state.camera.barcodeFinderVisible}
            barcodeFinderWidth={280}
            barcodeFinderHeight={220}
            barcodeFinderBorderColor="white"
            barcodeFinderBorderWidth={2}
            defaultTouchToFocus
            flashMode={this.state.camera.flashMode}
            mirrorImage={false}
            onBarCodeRead={this.onBarCodeRead.bind(this)}
            onFocusChanged={() => {}}
            onZoomChanged={() => {}}
            permissionDialogTitle={'Permission to use camera'}
            permissionDialogMessage={'We need your permission to use your camera phone'}
            style={styles.preview}
            type={this.state.camera.type}
        />
        <Modal
          animationType="slide"
          transparent={true}
          visible={this.state.modalVisible}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
          }}>
          <ClickableElement
            inner={
              <View style={styles.modalLayout}>
                <View style={styles.modalInner}>
                  <View style={styles.modalTop}>
                    <Text style={styles.modalHeader}>BarCode was detected!</Text>
                    <ClickableElement
                        inner={
                          <View style={styles.modalCloseButton}>
                            <DsproIcons
                                icon="clear"
                                width={22}
                                height={22}
                                color="white"
                                strokeColor="white"
                                fillColor="white"
                                strokeWidth={0.5} />
                          </View>
                        }
                        onPress={() => this.setModalVisible(false)}
                      />
                  </View>
                  <Text>Detected barcode is: {this.barcode}</Text>
                  <ClickableElement
                      inner={
                        <View style={styles.mainButton}>
                          <Text style={styles.mainButtonText}>Save BarCode</Text>
                        </View>
                      }
                      onPress={() => this.props.onSaveBarcode(this.barcode)}
                    />
                </View>
              </View>
            }
            onPress={() => this.setModalVisible(false)}
          />
        </Modal>
      </View>
    );
  }

}

const mapStateToProps = state => {
  return {
    isLoading: state.ui.isLoading,
    token: state.auth.token,
    expiresIn: state.auth.expiryDate
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onSaveBarcode: barcode => dispatch(saveBarCode(barcode)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(BarCodeScannerScreen);
