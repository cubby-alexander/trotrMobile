import React, { useState, useContext } from 'react';
import { AuthContext } from '../../constants/AuthContext';
import JWT from "expo-jwt";
import { clearData, storeData } from '../../helpers/tokenStorage';
import {JWT_SECRET, BACKEND_URL} from "@env";
import axios from "axios";
import {
  ImageBackground,
  Image,
  StyleSheet,
  StatusBar,
  Dimensions,
  Alert,
  Platform,
  TouchableWithoutFeedback, TouchableNativeFeedback
} from 'react-native';
import { Block, Button as GaButton, Button, Checkbox, Text, theme } from 'galio-framework';

const { height, width } = Dimensions.get('screen');
import { Images, nowTheme } from '../../constants';
import {onboardingStyles} from "./onboardingStyles";
import { Icon, Input } from '../../components';

export default function Onboarding({navigation}) {
  const [signIn, setSignIn] = useState({
    email: "",
    password: "",
  });
  const { user, setUser } = useContext(AuthContext);

  const attemptLogin = async () => {
    let axiosConfig = {
      "Content-Type": "application/json;charset=UTF-8",
      "Access-Control-Allow-Origin": "*",
    };
    let user = {
      email: "hall@gmail.com",  //signIn.email,
      password: "ron"          //signIn.password
    };
    try {
      await axios.post(`${BACKEND_URL}user/login`, user, axiosConfig)
        .then((res) => {
          if (res.data.message === "Login successful") {
            const decoded = JWT.decode(res.data.token, JWT_SECRET);
            storeData(decoded);
            setUser(decoded);
        } else if (res.data.message === "User email or password incorrect.") {
            Alert.alert(
              "Sign in failed",
              "User email or password incorrect.",
              [
                { text: "OK", onPress: () => console.log("OK Pressed") }
              ],
              { cancelable: false }
            );
          }})
    } catch (e) {
      console.log(e);
    }
  }

  const globalTokenVariable = "not_arbitrary";

  const styles = StyleSheet.create(onboardingStyles);

    return (
      <Block flex style={styles.container}>
        <StatusBar barStyle="light-content" />
        <Block flex>
          <ImageBackground
            source={Images.Pro}
            style={{ flex: 1, height: height, width, zIndex: 1 }}
          />
          <Block space="between" style={styles.padded}>
            <Block>
              <Block middle>
                <Image source={Images.FullLogo} style={styles.logo} />
              </Block>

              <Block middle style={styles.registerContainer}>
              <Block flex space="start">
                <Block flex={0.5} middle space="start">
                  <Block flex={0.6} middle>
                    <Text
                      style={{
                        fontFamily: 'proxima-nova-regular',
                        textAlign: 'center'
                      }}
                      color="#333"
                      size={24}
                    >
                      Sign In
                    </Text>
                  </Block>
                  <Block center flex={0.9}>
                    <Block flex space="between">
                      <Block>
                        <Block width={width * 0.78} style={{ marginBottom: 5 }}>
                          <Input
                            placeholder="Account Email"
                            type="default"
                            onChangeText={(text) => setSignIn(prevState => ({ ...prevState, email: text }))}
                            style={styles.inputs}
                            iconContent={
                              <Icon
                                size={16}
                                color="#ADB5BD"
                                name="email-852x"
                                family="NowExtra"
                                style={styles.inputIcons}
                              />
                            }
                          />
                        </Block>
                        <Block width={width * 0.78} style={{ marginBottom: 5 }}>
                          <Input
                            placeholder="Password"
                            style={styles.inputs}
                            password={true}
                            onChangeText={(text) => setSignIn(prevState => ({ ...prevState, password: text }))}
                            iconContent={
                              <Icon
                                size={16}
                                color="#ADB5BD"
                                name="lock"
                                family="AntDesign"
                                style={styles.inputIcons}
                              />
                            }
                          />
                        </Block>
                        <Block
                          style={{ marginVertical: theme.SIZES.BASE, marginLeft: 10}}
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
                              fontFamily: 'montserrat-regular'
                            }}
                            label="Remember me"
                          />
                        </Block>
                      </Block>

                      <Block center>
                        <Button
                          color="primary"
                          round
                          style={styles.createButton}
                          onPress={() => {
                            attemptLogin();
                            // navigation.navigate('App');
                          }}
                        >
                          <Text
                            style={{ fontFamily: 'proxima-nova' }}
                            size={16}
                            color={nowTheme.COLORS.WHITE}
                          >
                            Get Started
                          </Text>
                        </Button>
                      </Block>

                      <Block center style={{marginBottom: 35}}>
                        <TouchableNativeFeedback
                          onPress={() => navigation.navigate('Resend')}
                        >
                          <Text
                            style={{fontFamily: 'proxima-nova', color: nowTheme.COLORS.PRIMARY, fontSize: 15}}
                          >
                            I forgot my account email or password.
                          </Text>
                        </TouchableNativeFeedback>
                      </Block>

                      <Block width={width * 0.8}>
                        <Text>
                          <Text
                            center
                            style={{ fontFamily: 'proxima-nova-thin' }}
                            width={width * 0.8}
                            size={16}
                          >
                            Want to see which of your friends are in town and make plans more easily?
                          </Text>
                          <Text> </Text> {/*white space*/}
                          <TouchableWithoutFeedback
                            onPress={() => navigation.navigate('SignUp')}
                          >
                            <Text
                              style={{ fontFamily: 'proxima-nova', color: nowTheme.COLORS.PRIMARY }}
                              size={16}
                            >
                               Sign up.
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
          </Block>
        </Block>
      </Block>
    );
  }
