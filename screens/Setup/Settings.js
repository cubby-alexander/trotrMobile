import React, { useEffect } from 'react';
import { useState } from 'react';
import {
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ScrollView, Dimensions,
  StatusBar
} from 'react-native';
import { Block, Text, theme, Icon } from "galio-framework";
import { Switch } from "../../components";

import nowTheme from "../../constants/Theme";

const {height, width} = Dimensions.get("screen");

export default function Settings(props) {
  const [state, setState] = useState({tabId: 'photo'});

  useEffect(() => {
    if (props.route.hasOwnProperty('tabId')) {
      setState({tabId: props.route.params.tabId})
    }
  }, [props.route])

  const toggleSwitch = switchNumber =>
    setState(prevState => ({...prevState, [switchNumber]: switchNumber}))

  const renderItem = ({ item }) => {
    const { navigate } = props.navigation;

    switch (item.type) {
      case "switch":
        return (
          <Block row middle space="between" style={styles.rows}>
            <Text style={{ fontFamily: 'proxima-nova' }} size={14} color="#525F7F">
              {item.title}
            </Text>
            <Switch
              onValueChange={() => toggleSwitch(item.id)}
              value={state[item.id]}
            />
          </Block>
        );
      case "button":
        return (
          <Block style={styles.rows}>
            <TouchableOpacity onPress={() => navigate(item.id)}>
              <Block row middle space="between" style={{ paddingTop: 7 }}>
                <Text style={{ fontFamily: 'proxima-nova' }} size={14} color="#525F7F">{item.title}</Text>
                <Icon
                  name="angle-right"
                  family="font-awesome"
                  style={{ paddingRight: 5 }}
                />
              </Block>
            </TouchableOpacity>
          </Block>
        );
      default:
        break;
    }
  };

    const recommended = [
      { title: "Use FaceID to sign in", id: "face", type: "switch" },
      { title: "Auto-Lock security", id: "autolock", type: "switch" },
      { title: "Notifications", id: "NotificationsSettings", type: "button" }
    ];

    const payment = [
      { title: "Manage Payment Optionss", id: "Payment", type: "button" },
      { title: "Manage Gift Cards", id: "gift", type: "button" }
    ];

    const privacy = [
      { title: "User Agreement", id: "Agreement", type: "button" },
      { title: "Privacy", id: "Privacy", type: "button" },
      { title: "About", id: "About", type: "button" }
    ];

    return (
      <Block style={styles.container}>
        <StatusBar barStyle="light-content" />
        <Block center style={styles.mainTitle}>
          <Text size={24} style={{ fontFamily: 'proxima-nova' }} color={nowTheme.COLORS.TEXT}>
            Hi there!
          </Text>

          <Text
            size={16}
            style={{fontFamily: 'proxima-nova', marginTop: height * 0.03, width: width * 0.9}}
            color={nowTheme.COLORS.TEXT}
          >
            This looks like a new account. Can we get started with some basic information?
          </Text>

          <Text
            size={16}
            style={{fontFamily: 'proxima-nova', marginTop: height * 0.03, width: width * 0.9}}
            color={nowTheme.COLORS.TEXT}
          >
            You can change all these settings later, but we need them before you access the rest of the app.
          </Text>
        </Block>

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.settings}
        >
          <FlatList
            data={recommended}
            keyExtractor={(item, index) => item.id}
            renderItem={renderItem}
            ListHeaderComponent={
              <Block center style={styles.title}>
                <Text style={{ fontFamily: 'proxima-nova', paddingBottom: 5 }} size={theme.SIZES.BASE} color={nowTheme.COLORS.TEXT}>
                  Recommended Settings
                </Text>
                <Text style={{ fontFamily: 'proxima-nova' }} size={12} color={nowTheme.COLORS.CAPTION} color={nowTheme.COLORS.TEXT}>
                  These are the most important settings
                </Text>
              </Block>
            }
          />
          <Block center style={styles.title}>
            <Text style={{ fontFamily: 'proxima-nova', paddingBottom: 5 }} size={theme.SIZES.BASE} color={nowTheme.COLORS.TEXT}>
              Payment Settings
            </Text>
            <Text style={{ fontFamily: 'proxima-nova' }} size={12} color={nowTheme.COLORS.CAPTION} color={nowTheme.COLORS.TEXT}>
              These are also important settings
            </Text>
          </Block>

          <FlatList
            data={payment}
            keyExtractor={(item, index) => item.id}
            renderItem={renderItem}
          />

          <Block center style={styles.title}>
            <Text style={{ fontFamily: 'proxima-nova', paddingBottom: 5 }} size={theme.SIZES.BASE} color={nowTheme.COLORS.TEXT}>
              Privacy Settings
            </Text>
            <Text style={{ fontFamily: 'proxima-nova' }} size={12} color={nowTheme.COLORS.CAPTION} color={nowTheme.COLORS.TEXT}>
              Third most important settings
            </Text>
          </Block>
          <FlatList
            data={privacy}
            keyExtractor={(item, index) => item.id}
            renderItem={renderItem}
          />
        </ScrollView>
      </Block>
    );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: theme.SIZES.BASE
  },
  settings: {
    paddingVertical: theme.SIZES.BASE / 3
  },
  mainTitle: {
    paddingBottom: theme.SIZES.BASE,
    marginTop: height * 0.2,
  },
  title: {
    paddingTop: theme.SIZES.BASE,
    paddingBottom: theme.SIZES.BASE / 2
  },
  rows: {
    height: theme.SIZES.BASE * 2,
    paddingHorizontal: theme.SIZES.BASE,
    marginBottom: theme.SIZES.BASE / 2
  }
});
