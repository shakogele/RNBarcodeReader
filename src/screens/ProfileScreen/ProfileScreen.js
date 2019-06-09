import React, { Component } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { connect } from "react-redux";

import styles from './profileScreenStyles';
import { profileScreenOptions } from './profileScreenOptions';

import ClickableElement from '../../components/UI/ClickableElement/ClickableElement';
import DsproIcons from '../../components/UI/DsproIcons/DsproIcons';
import CustomHeader from '../../components/UI/CustomHeader/CustomHeader';
import gotoScreen from '../../components/UI/GotoScreen/gotoScreen';

class ProfileScreen extends Component{

  constructor(props){
    super(props);
  };

  static options(){
    return profileScreenOptions;
  };

  updateUserProfileDate(){

  };

  render(){
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
                                  onPress={() => gotoScreen(this.props.componentId, 'back')}
                                />;
    const myBarCodes = this.props.barcodes && this.props.barcodes.map(code => {
      return <Text key={code} style={styles.barcodeItem}>{code}</Text>
    });
    return(
      <View style={styles.background}>
        <CustomHeader
            background="teal"
            topBorder={false}
            centerBlock={<Text style={styles.centerBlock}>User ProfileScreen</Text>}
            leftBlock={ leftMenuIconButton } />
        <View style={styles.mainContainer}>
          <View style={styles.block}>
            <Text style={ styles.blockHeader }>My BarCodes</Text>
            <ScrollView style={styles.scrollView}>
              {myBarCodes}
            </ScrollView>
            <ClickableElement
              inner={
                <View style={styles.mainButton}>
                  <Text style={styles.mainButtonText}>Add BarCode</Text>
                </View>
              }
              onPress={() => gotoScreen(this.props.componentId, 'liftApp.BarCodeScannerScreen')}
            />
          </View>
          <View style={styles.block}>
            <Text style={ styles.blockHeader }>My Profile Data</Text>
            <ScrollView style={styles.scrollView}>

            </ScrollView>
            <ClickableElement
              inner={
                <View style={styles.mainButton}>
                  <Text style={styles.mainButtonText}>Update</Text>
                </View>
              }
              onPress={this.updateUserProfileDate}
            />
          </View>
        </View>
      </View>
    )
  }
}

const mapStateToProps = state => {
  return {
    isLoading: state.ui.isLoading,
    token: state.auth.token,
    barcodes: state.auth.userData && state.auth.userData.barcodes
  };
};

const mapDispatchToProps = dispatch => {
  return {
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfileScreen);
