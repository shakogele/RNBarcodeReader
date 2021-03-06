import React, { Component } from 'react';
import { Text, View, ScrollView, Image } from 'react-native';

import styles from './welcomeScreenStyles';
import { welcomeScreenOptions } from './welcomeScreenOptions';

import CustomHeader from '../../components/UI/CustomHeader/CustomHeader';
import ClickableElement from '../../components/UI/ClickableElement/ClickableElement';
import DsproIcons from '../../components/UI/DsproIcons/DsproIcons';
import gotoScreen from '../../components/UI/GotoScreen/gotoScreen';

import lift from '../../assets/images/lift.png';

class WelcomeScreen extends Component{

  static options(){
    return welcomeScreenOptions;
  }

  toggleSideDrawer = () => {
    Navigation("")
  }

  render(){
    const leftMenuIconButton = <ClickableElement
                                  inner={
                                    <View style={styles.buttonContainer}>
                                      <DsproIcons
                                          icon="menu"
                                          width={22}
                                          height={22}
                                          color="teal"
                                          strokeColor="teal"
                                          fillColor="teal"
                                          strokeWidth={0.5} />
                                    </View>
                                  }
                                  onPress={() => gotoScreen(this.props.componentId, 'sidebar')}
                                />;
    return (
      <View style={styles.background}>
        <CustomHeader
            background="teal"
            topBorder={false}
            leftBlock={ leftMenuIconButton } />
        <ScrollView style={styles.mainContainer} contentContainerStyle={{ justifyContent: "center" }}>
          <View style={styles.logoView}>
            <Image source={lift} style={styles.logoImage} />
          </View>
          <Text style={styles.welcomeText}>Welcome to LiftApp</Text>
          <View style={styles.buttonsContainer}>
            <ClickableElement
              inner={
                <View style={styles.mainButton}>
                  <Text style={styles.mainButtonText}>Log In</Text>
                </View>
              }
              onPress={() => gotoScreen(this.props.componentId, 'liftApp.LoginScreen')}
            />
            <ClickableElement
              inner={
                <View style={styles.mainButton}>
                  <Text style={styles.mainButtonText}>Sign Up</Text>
                </View>
              }
              onPress={() => gotoScreen(this.props.componentId, 'liftApp.SignUpScreen')}
            />
          </View>
        </ScrollView>
      </View>
    )
  }

}

export default WelcomeScreen;
