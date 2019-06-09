import React, { Component } from 'react';
import { View, Text, ScrollView, Keyboard } from 'react-native';
import { connect } from "react-redux";

import { signUpScreenOptions } from './signUpScreenOptions';
import styles from './signUpScreenStyles';

import CustomHeader from '../../components/UI/CustomHeader/CustomHeader';
import DefaultInput from '../../components/UI/DefaultInput/DefaultInput';
import ClickableElement from '../../components/UI/ClickableElement/ClickableElement';
import DsproIcons from '../../components/UI/DsproIcons/DsproIcons';
import gotoScreen from '../../components/UI/GotoScreen/gotoScreen';

import validate from '../../utility/validation';

import { tryAuth, authAutoSignIn } from "../../store/actions/index";

class SignUpScreen extends Component{

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
        },
        confirmPassword: {
          value: "",
          valid: false,
          validationRules: {
            equalTo: "password"
          },
          touched: false
        }
      }
    }
  };

  static options(){
    return signUpScreenOptions;
  };

  componentDidMount() {
    this.props.onAutoSignIn();
  };

  onClickRegister = () => {
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
    this.props.onTryAuth(authData, 'signup')
  };

  updateInputState = (key, value) => {
    let connectedValue = {};
    if (this.state.controls[key].validationRules.equalTo) {
      const equalControl = this.state.controls[key].validationRules.equalTo;
      const equalValue = this.state.controls[equalControl].value;
      connectedValue = {
        ...connectedValue,
        equalTo: equalValue
      };
    }
    if (key === "password") {
      connectedValue = {
        ...connectedValue,
        equalTo: value
      };
    }
    this.setState(prevState => {
      return {
        controls: {
          ...prevState.controls,
          confirmPassword: {
            ...prevState.controls.confirmPassword,
            valid:
              key === "password"
                ? validate(
                    prevState.controls.confirmPassword.value,
                    prevState.controls.confirmPassword.validationRules,
                    connectedValue
                  )
                : prevState.controls.confirmPassword.valid
          },
          [key]: {
            ...prevState.controls[key],
            value: value,
            valid: validate(
              value,
              prevState.controls[key].validationRules,
              connectedValue
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
    const registerButton = <ClickableElement
                                  inner={
                                    <View style={styles.registerButton}>
                                      <Text style={styles.mainButtonText}>Register</Text>
                                    </View>
                                  }
                                  onPress={this.onClickRegister}
                                />;
    return (
      <View style={styles.background}>
        <CustomHeader
            background="teal"
            topBorder={false}
            leftBlock={ leftMenuIconButton } />
        <ClickableElement
          inner={
            <View style={styles.mainContainer}>
              <ScrollView style={styles.inputsContainer} keyboardShouldPersistTaps="always">
                <Text style={styles.welcomeText}>Register to LiftApp</Text>
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
                <DefaultInput
                    placeholder="Confirm Password"
                    style={styles.input}
                    value={this.state.controls.confirmPassword.value}
                    onChangeText={val => this.updateInputState("confirmPassword", val)}
                    valid={this.state.controls.confirmPassword.valid}
                    touched={this.state.controls.confirmPassword.touched}
                    secureTextEntry
                  />
                {registerButton}
              </ScrollView>
            </View>
          }
          onPress={Keyboard.dismiss}
        />
      </View>
    )
  }

}

const mapStateToProps = state => {
  return {
    isLoading: state.ui.isLoading
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onTryAuth: (authData, authMode) => dispatch(tryAuth(authData, authMode)),
    onAutoSignIn: () => dispatch(authAutoSignIn())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignUpScreen);
