import React, { Component } from 'react';
import { ScrollView, View, Text } from 'react-native';
import { connect } from "react-redux";

import { loginScreenOptions } from './loginScreenOptions';
import styles from './loginScreenStyles';

import CustomHeader from '../../components/UI/CustomHeader/CustomHeader';
import DefaultInput from '../../components/UI/DefaultInput/DefaultInput';
import ClickableElement from '../../components/UI/ClickableElement/ClickableElement';
import DsproIcons from '../../components/UI/DsproIcons/DsproIcons';
import gotoScreen from '../../components/UI/GotoScreen/gotoScreen';

import validate from '../../utility/validation';

import { tryAuth, authAutoSignIn } from "../../store/actions/index";

class LoginScreen extends Component{

  constructor(props){
    super(props);
    this.state={
      controls: {
        email: {
          value: "",
          valid: false,
          validationRules: {
            isEmail: true
          },
          touched: false
        },
        password: {
          value: "",
          valid: false,
          validationRules: {
            minLength: 6
          },
          touched: false
        }
      }
    }
  };

  static getDerivedStateFromProps(props, state){
    if(props.token && props.expiresIn){
      if(props.expiresIn > new Date().getTime()){
        gotoScreen(props.componentId, 'liftApp.BarCodeScannerScreen');
      }
    }
    return null;
  };

  componentDidMount() {
    this.props.onAutoSignIn();
  };

  static options(){
    return loginScreenOptions;
  }

  onClickLogin = () => {
    for(let ctrl in this.state.controls){
      if(!this.state.controls[ctrl].valid){
        alert("Please Fill in All Required Fields")
        return false;
      }
    }
    const authData = {
      email: this.state.controls.email.value,
      password: this.state.controls.password.value
    };
    this.props.onTryAuth(authData, 'signin')
  }

  updateInputState = (key, value) => {
    this.setState(prevState => {
      return {
        controls: {
          ...prevState.controls,
          [key]: {
            ...prevState.controls[key],
            value: value,
            valid: validate(
              value,
              prevState.controls[key].validationRules,
            ),
            touched: true
          }
        }
      };
    });
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
    const loginButton = <ClickableElement
                                  inner={
                                    <View style={styles.registerButton}>
                                      <Text style={styles.mainButtonText}>Log In</Text>
                                    </View>
                                  }
                                  onPress={this.onClickLogin}
                                />;
    return (
      <View style={styles.background}>
        <CustomHeader
            background="teal"
            topBorder={false}
            leftBlock={ leftMenuIconButton } />
        <View style={styles.mainContainer}>
          <ScrollView style={styles.inputsContainer} keyboardShouldPersistTaps="always">
            <Text style={styles.welcomeText}>Log In to LiftApp</Text>
            <DefaultInput
                placeholder="Your E-Mail Address"
                style={styles.input}
                value={this.state.controls.email.value}
                onChangeText={val => this.updateInputState("email", val)}
                valid={this.state.controls.email.valid}
                touched={this.state.controls.email.touched}
                autoCapitalize="none"
                autoCorrect={false}
                keyboardType="email-address"
              />
            <DefaultInput
                placeholder="Password"
                style={styles.input}
                value={this.state.controls.password.value}
                onChangeText={val => this.updateInputState("password", val)}
                valid={this.state.controls.password.valid}
                touched={this.state.controls.password.touched}
                secureTextEntry
              />
            {loginButton}
          </ScrollView>
        </View>
      </View>
    )
  }

}

const mapStateToProps = state => {
  console.log("Reduxt state", state);
  return {
    isLoading: state.ui.isLoading,
    token: state.auth.token,
    expiresIn: state.auth.expiryDate
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onTryAuth: (authData, authMode) => dispatch(tryAuth(authData, authMode)),
    onAutoSignIn: () => dispatch(authAutoSignIn())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen);
