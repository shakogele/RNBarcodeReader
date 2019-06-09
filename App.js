import React from 'react';
import { Navigation } from 'react-native-navigation';
import { Provider } from 'react-redux';

import SideDrawer from './src/screens/SideDrawer/SideDrawer';
import WelcomeScreen from './src/screens/WelcomeScreen/WelcomeScreen';
import LoginScreen from './src/screens/LoginScreen/LoginScreen';
import SignUpScreen from './src/screens/SignUpScreen/SignUpScreen';
import BarCodeScannerScreen from './src/screens/BarCodeScannerScreen/BarCodeScannerScreen';
import ProfileScreen from './src/screens/ProfileScreen/ProfileScreen';

import configureStore from './src/store/configureStore';

const store = configureStore();

Navigation.registerComponentWithRedux(`liftApp.SideDrawer`, () => SideDrawer, Provider, store);
Navigation.registerComponentWithRedux(`liftApp.WelcomeScreen`, () => WelcomeScreen, Provider, store);
Navigation.registerComponentWithRedux(`liftApp.LoginScreen`, () => LoginScreen, Provider, store);
Navigation.registerComponentWithRedux(`liftApp.SignUpScreen`, () => SignUpScreen, Provider, store);
Navigation.registerComponentWithRedux(`liftApp.BarCodeScannerScreen`, () => BarCodeScannerScreen, Provider, store);
Navigation.registerComponentWithRedux(`liftApp.ProfileScreen`, () => ProfileScreen, Provider, store);

export default () => Navigation.events().registerAppLaunchedListener(() => {

  Navigation.setDefaultOptions({
    topBar: {
      visible: false,
    }
  });

  Navigation.setRoot({
    root: {
      sideMenu: {
        left: {
          component: {
            name: 'liftApp.SideDrawer',
            id: 'leftSideMenu',
            passProps: {
              text: 'This is a left side menu screen'
            },
            options: {
              topBar: {
                visible: false
              }
            }
          }
        },
        center: {
          stack:{
            id: 'WelcomeScreen',
            children: [
              {
                component: {
                  name: 'liftApp.ProfileScreen'
                }
              }
            ]
          }
        }
      },
    }
  });

});
