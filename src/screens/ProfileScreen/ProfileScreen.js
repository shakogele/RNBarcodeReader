import React, { Component } from 'react';
import { View, Text } from 'react-native';
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
  }

  static options(){
    return profileScreenOptions;
  }

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
    return(
      <View style={styles.background}>
        <CustomHeader
            background="teal"
            topBorder={false}
            centerBlock={<Text style={styles.centerBlock}>User ProfileScreen</Text>}
            leftBlock={ leftMenuIconButton } />
      </View>
    )
  }
}

const mapStateToProps = state => {
  return {
    isLoading: state.ui.isLoading,
    token: state.auth.token,
    barcode: state.auth.barcode
  };
};

const mapDispatchToProps = dispatch => {
  return {
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfileScreen);
