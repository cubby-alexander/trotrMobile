import React, { useContext, useState } from 'react';
import { AuthContext } from '../constants/AuthContext';
import { Block } from "galio-framework";
import { Easing, Animated, Dimensions } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
// screens
import Home from '../screens/Home';
import Pro from '../screens/Pro';
import Setup from '../screens/Setup/Settings.js';
import Profile from '../screens/Profile';
import Timeline from "../screens/Timeline";
import Friends from "../screens/Friends";
import Travel from "../screens/Travel";
import Components from '../screens/Components';
import Articles from '../screens/Articles';
import Onboarding from '../screens/Onboarding/Onboarding';
import SignUp from '../screens/SignUp/SignUp';
import SettingsScreen from '../screens/Settings';
// drawer
import CustomDrawerContent from "./Menu";
// header for screens
import { Header, Icon} from '../components';
import { nowTheme, tabs } from "../constants";

const { width } = Dimensions.get("screen");

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

function ComponentsStack(props) {
  return (
    <Stack.Navigator initialRouteName="Components" mode="card" headerMode="screen">
      <Stack.Screen name="Components" component={Components} options={{
        header:({ navigation, scene }) => (<Header title="Components" navigation={navigation} scene={scene} />),
        backgroundColor: "#FFFFFF"
      }}/>
    </Stack.Navigator>
  );
}

function ArticlesStack(props) {
  return (
    <Stack.Navigator initialRouteName="Articles" mode="card" headerMode="screen">
      <Stack.Screen name="Articles" component={Articles} options={{
        header: ({ navigation, scene }) => (<Header title="Articles" navigation={navigation} scene={scene} />),
        backgroundColor: '#FFFFFF'
      }} />
    </Stack.Navigator>
  );
}

function TimelineStack(props) {
  return (
    <Stack.Navigator initialRouteName="Timeline" mode="card" headerMode="screen">
      <Stack.Screen name="Timeline" component={Timeline} options={{
        header: ({ navigation, scene }) => (<Header title="Timeline" navigation={navigation} scene={scene} />),
        backgroundColor: '#FFFFFF'
      }} />
    </Stack.Navigator>
  );
}

function TravelStack(props) {
  return (
    <Stack.Navigator initialRouteName="Travel" mode="card" headerMode="screen">
      <Stack.Screen name="Travel" component={Travel} options={{
        header: ({ navigation, scene }) => (<Header title="Travel" navigation={navigation} scene={scene} />),
        backgroundColor: '#FFFFFF'
      }} />
    </Stack.Navigator>
  );
}

function AccountStack(props) {
  return (
    <Stack.Navigator initialRouteName="Account" mode="card" headerMode="screen">
      <Stack.Screen
        name="Account"
        component={SignUp}
        options={{
          header: ({ navigation, scene }) => (
            <Header
              transparent
              title="Create Account"
              navigation={navigation}
              scene={scene}
            />
          ),
          headerTransparent: true
        }}
      />
    </Stack.Navigator>
  );
}

function ProfileStack(props) {
  return (
    <Stack.Navigator initialRouteName="Profile" mode="card" headerMode="screen">
      <Stack.Screen
        name="Profile"
        component={Profile}
        options={{
          header: ({ navigation, scene }) => (
            <Header
              transparent
              white
              title="Profile"
              navigation={navigation}
              scene={scene}
            />
          ),
          cardStyle: { backgroundColor: "#FFFFFF" },
          headerTransparent: true
        }}
      />
      <Stack.Screen
        name="Pro"
        component={Pro}
        options={{
          header: ({ navigation, scene }) => (
            <Header
              title=""
              back
              white
              transparent
              navigation={navigation}
              scene={scene}
            />
          ),
          headerTransparent: true
        }}
      />
    </Stack.Navigator>
  );
}

function HomeStack(props) {
  const { user } = useContext(AuthContext);

  if (user) {
    return (
      <Stack.Navigator mode='card' headerMode='screen'>
        {user.hasOwnProperty('domestic') && <Stack.Screen
          name='Account Setup'
          component={Setup}
          options={{
            header: ({ navigation, scene }) => (
              <Header
                title='Account Setup'
                white
                logo
                bgColor={nowTheme.COLORS.PRIMARY}
                logout
                navigation={navigation}
                scene={scene}
              />
            ),
            headerTransparent: true
          }}
        />}
        <Stack.Screen
          name='Home'
          component={Home}
          options={{
            header: ({ navigation, scene }) => (
              <Header
                title='Home'
                search
                options
                navigation={navigation}
                scene={scene}
              />
            ),
            cardStyle: { backgroundColor: '#FFFFFF' }
          }}
        />
      </Stack.Navigator>
    );
  } else {
    return null;
  }
}

function FriendsStack(props) {
  return (
    <Stack.Navigator mode="card" headerMode="screen">
      <Stack.Screen
        name="Friends"
        component={Friends}
        options={{
          header: ({ navigation, scene }) => (
            <Header
              title="Friends"
              search
              options
              navigation={navigation}
              scene={scene}
            />
          ),
          cardStyle: { backgroundColor: "#FFFFFF" }
        }}
      />
    </Stack.Navigator>
  );
}

function AppStack(props) {
  return (
    <Drawer.Navigator
      style={{ flex: 1 }}
      drawerContent={props => <CustomDrawerContent {...props} />}
      drawerStyle={{
        backgroundColor: nowTheme.COLORS.PRIMARY,
        width: width * 0.8
      }}
      drawerContentOptions={{
        activeTintcolor: nowTheme.COLORS.WHITE,
        inactiveTintColor: nowTheme.COLORS.WHITE,
        activeBackgroundColor: "transparent",
        itemStyle: {
          width: width * 0.75,
          backgroundColor: "transparent",
          paddingVertical: 16,
          paddingHorizonal: 12,
          justifyContent: "center",
          alignContent: "center",
          alignItems: "center",
          overflow: "hidden"
        },
        labelStyle: {
          fontSize: 18,
          marginLeft: 12,
          fontWeight: "normal"
        }
      }}
      initialRouteName="Home"
    >
      <Drawer.Screen name="Home" component={HomeStack} />
      <Drawer.Screen name="Timeline" component={TimelineStack} />
      <Drawer.Screen name="Travel" component={TravelStack} />
      <Drawer.Screen name="Friends" component={FriendsStack} />
      <Drawer.Screen name="Components" component={ComponentsStack} />
      <Drawer.Screen name="Articles" component={ArticlesStack} />
      <Drawer.Screen name="Profile" component={ProfileStack} />
      <Drawer.Screen name="Account" component={AccountStack} />
    </Drawer.Navigator>
  );
}

export default function OnboardingStack(props) {
  const [isSignout, setIsSignout] = useState(false);
  const { user } = useContext(AuthContext);

  console.log("Hi there, this is the context user reported by Screens.js:", user);

  return (
    <Stack.Navigator mode="card" headerMode="none">
      {!user && <Stack.Screen
        name='Onboarding'
        component={Onboarding}
        option={{
          headerTransparent: true,
          animationTypeForReplace: isSignout ? 'pop' : 'push'
        }}
      />}
      {!user && <Stack.Screen
        name='SignUp'
        component={SignUp}
        option={{
          headerTransparent: true,
          animationTypeForReplace: isSignout ? 'pop' : 'push'
        }}
      />}
      {user !== null && <Stack.Screen name='App' component={AppStack} />}
    </Stack.Navigator>
  );
}

