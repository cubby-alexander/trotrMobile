import React, { useContext, useState } from 'react';
import axios from 'axios';
import {JWT_SECRET, BACKEND_URL} from "@env";
import { AuthContext } from '../../constants/AuthContext';
import {
  StyleSheet,
  ImageBackground,
  Dimensions,
  TouchableWithoutFeedback,
  Keyboard
} from 'react-native';
import { Block, Checkbox, Text, theme } from 'galio-framework';

import { Button, Icon, Input } from '../../components';
import { Images, nowTheme } from '../../constants';
import { signupStyles } from './signupStyles';
import JWT from 'expo-jwt';
import { storeData } from '../../helpers/tokenStorage';

const { width, height } = Dimensions.get('screen');

const DismissKeyboard = ({ children }) => (
  <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>{children}</TouchableWithoutFeedback>
);


export default function SignUp(props) {
  const { navigation } = props;
  const [termsChecked, setTermsChecked] = useState(false);
  const [signupForm, setSignupForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  });
  const [formErrorsPresent, setFormErrorsPresent] = useState({
    name: false,
    email: false,
    password: false,
    confirmPassword: false
  });
  const [displayErrors, setDisplayErrors] = useState(false);
  const [errorMessages, setErrorMessages] = useState([]);
  const styles = StyleSheet.create(signupStyles);
  const { user, setUser } = useContext(AuthContext);

  const submitSignUp = () => {
    setErrorMessages([]);
    let errors = [];
    if (signupForm.password !== signupForm.confirmPassword || signupForm.name === "" || termsChecked !== true || signupForm.password === "") {
      if (signupForm.password !== signupForm.confirmPassword) {
        setFormErrorsPresent(prevState => (
          {...prevState,
            password: true,
            confirmPassword: true}
        ));
        errors.push("'Password' and 'Confirm Password' fields must match")
      }
      if (signupForm.password === "") {
        setFormErrorsPresent(prevState => (
          {...prevState,
            password: true }
        ));
        errors.push("'Password' field cannot be empty")
      }
      if (signupForm.name === "") {
        setFormErrorsPresent(prevState => (
          {...prevState,
            name: true}
        ));
        errors.push("'Full Name' field cannot be empty")
      }
      if (signupForm.email === "") {
        setFormErrorsPresent(prevState => (
          {...prevState,
            email: true}
        ));
        errors.push("'Email' field cannot be empty")
      }
      if (termsChecked !== true) {
        errors.push("You must agree to the terms and conditions");
      }
      setDisplayErrors(true);
      setErrorMessages(errors);
    } else {
      console.log("Creating...")
      createUser();
    }
  }

  const createUser = () => {
    let axiosConfig = {
      headers: {
        'Content-Type': 'application/json;char=UTF-8',
        "Access-Control-Allow-Origin": "*",
      }
    };
    let newUser = {
      name: signupForm.name,
      email: signupForm.email,
      password: signupForm.password};
    axios.post(`${BACKEND_URL}user/`, newUser, axiosConfig)
      .then((res) => {
        const decoded = JWT.decode(res.data.token, JWT_SECRET);
        storeData(decoded);
        setUser(decoded);
      })
      .catch((err) => console.log(err))
  }

  return (
    <DismissKeyboard>
      <Block flex middle>
        <ImageBackground
          source={Images.RegisterBackground}
          style={styles.imageBackgroundContainer}
          imageStyle={styles.imageBackground}
        >
          <Block flex middle>
            <Block style={displayErrors ? styles.errorContainer : styles.registerContainer}>
              <Block flex space="evenly">
                <Block flex={0.2} middle>
                  <Text
                    style={{
                      fontFamily: 'proxima-nova-regular',
                      textAlign: 'center'
                    }}
                    color="#333"
                    size={24}
                  >
                    {displayErrors ? "Whoops, a few things need fixing" : "Create Trotr Account"}
                  </Text>
                </Block>

                <Block flex={1} middle space="between">
                  <Block center flex={0.85}>
                    <Block flex space="between">

                      {!displayErrors ?
                        <Block>
                          <Block width={width * 0.75} style={{ marginBottom: height * 0.005 }}>
                          <Input
                            placeholder='First Name'
                            style={styles.inputs}
                            error={formErrorsPresent.name}
                            onChangeText={(text) => setSignupForm(prevState => ({...prevState, name: text}))}
                            onFocus={() => setFormErrorsPresent(prevState => ({...prevState, name: false}))}
                            iconContent={
                              <Icon
                                size={16}
                                color='#ADB5BD'
                                name='profile-circle'
                                family='NowExtra'
                                style={styles.inputIcons}
                              />
                            }
                          >{signupForm.name}</Input>
                        </Block>

                          <Block width={width * 0.75} style={{ marginBottom: height * 0.005 }}>
                            <Input
                              placeholder='Email'
                              keyboardType='email-address'
                              style={styles.inputs}
                              error={formErrorsPresent.email}
                              onChangeText={(text) => setSignupForm(prevState => ({...prevState, email: text}))}
                              onFocus={() => setFormErrorsPresent(prevState => ({...prevState, email: false}))}
                              iconContent={
                                <Icon
                                  size={16}
                                  color='#ADB5BD'
                                  name='email-852x'
                                  family='NowExtra'
                                  style={styles.inputIcons}
                                />
                              }
                            >{signupForm.email}</Input>
                          </Block>

                          <Block width={width * 0.75} style={{ marginBottom: height * 0.005 }}>
                            <Input
                              placeholder='Password'
                              password
                              error={formErrorsPresent.password}
                              style={styles.inputs}
                              onChangeText={(text) => setSignupForm(prevState => ({...prevState, password: text}))}
                              onFocus={() => setFormErrorsPresent(prevState => ({...prevState, password: false}))}
                              iconContent={
                                <Icon
                                  size={16}
                                  color='#ADB5BD'
                                  name='lock'
                                  family='AntDesign'
                                  style={styles.inputIcons}
                                />
                              }
                            >{signupForm.password}</Input>
                          </Block>

                          <Block width={width * 0.75} style={{ marginBottom: height * 0.005 }}>
                            <Input
                              placeholder='Confirm Password'
                              password
                              style={styles.inputs}
                              error={formErrorsPresent.confirmPassword}
                              onChangeText={(text) => setSignupForm(prevState => ({...prevState, confirmPassword: text}))}
                              onFocus={() => setFormErrorsPresent(prevState => ({...prevState, confirmPassword: false}))}
                              iconContent={
                                <Icon
                                  size={16}
                                  color='#ADB5BD'
                                  name='lock'
                                  family='AntDesign'
                                  style={styles.inputIcons}
                                />
                              }
                            >{signupForm.confirmPassword}</Input>
                          </Block>

                          <Block
                            style={{ marginVertical: theme.SIZES.BASE, marginLeft: 15 }}
                            row
                            width={width * 0.75}
                          >
                            <Checkbox
                              checkboxStyle={{
                                borderWidth: 1,
                                borderRadius: 2,
                                borderColor: '#E3E3E3'
                              }}
                              color={nowTheme.COLORS.PRIMARY}
                              labelStyle={{
                                color: nowTheme.COLORS.HEADER,
                                fontFamily: 'proxima-nova-regular'
                              }}
                              label='I agree to the terms and conditions.'
                              onChange={() => setTermsChecked(prevState => !prevState)}
                            />
                          </Block>
                        </Block> :
                        <Block flex={0.8} style={{marginTop: height * 0.02}}>
                          {errorMessages.map((error, idx) => {
                            return (
                              <Block key={idx} width={width * 0.7} style={{marginBottom: height * 0.02, marginLeft: width * 0.05}}>
                                <Text
                                  style={{fontFamily: 'proxima-nova'}}
                                  size={16}
                                >{error}</Text>
                              </Block>
                            )
                          })}
                        </Block>
                      }

                      {!displayErrors && <Block center>
                        <Button
                          color='primary'
                          round
                          style={styles.createButton}
                          onPress={() => submitSignUp()}
                        >
                          <Text
                            style={{ fontFamily: 'proxima-nova' }}
                            size={14}
                            color={nowTheme.COLORS.WHITE}
                          >
                            Get Started
                          </Text>
                        </Button>
                      </Block>}

                      {displayErrors && <Block center>
                        <Button
                          color='error'
                          round
                          style={styles.createButton}
                          onPress={() => setDisplayErrors(false)}
                        >
                          <Text
                            style={{ fontFamily: 'proxima-nova' }}
                            size={14}
                            color={nowTheme.COLORS.WHITE}
                          >
                            Try Again
                          </Text>
                        </Button>
                      </Block>}

                      <Block width={width * 0.8}>
                        <Text>
                          <Text
                            center
                            style={{ fontFamily: 'proxima-nova-thin' }}
                            width={width * 0.8}
                            size={16}
                          >
                             Already have an account?
                          </Text>
                          <Text> </Text> {/*white space*/}
                          <TouchableWithoutFeedback
                            onPress={() => navigation.navigate('Onboarding')}
                          >
                            <Text
                              style={{ fontFamily: 'proxima-nova', color: nowTheme.COLORS.PRIMARY }}
                              size={16}
                            >
                              Sign in.
                            </Text>
                          </TouchableWithoutFeedback>
                        </Text>
                      </Block>

                    </Block>
                  </Block>
                </Block>
              </Block>
            </Block>
          </Block>
        </ImageBackground>
      </Block>
    </DismissKeyboard>
  );
}
