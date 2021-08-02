import React from 'react';
import { Image } from 'react-native';
import AppLoading from 'expo-app-loading';
import * as Font from 'expo-font';
import { Asset } from 'expo-asset';
import { Block, GalioProvider } from 'galio-framework';
import { NavigationContainer } from '@react-navigation/native';
import { AuthProvider } from './constants/AuthContext';

import Screens from './navigation/Screens';
import { Images, articles, nowTheme } from './constants';
import { getData } from './helpers/tokenStorage';

// cache app images
const assetImages = [
  Images.Onboarding,
  Images.Logo,
  Images.Pro,
  Images.NowLogo,
  Images.iOSLogo,
  Images.androidLogo,
  Images.ProfilePicture,
  Images.CreativeTimLogo,
  Images.InvisionLogo,
  Images.RegisterBackground,
  Images.ProfileBackground
];

// cache product images
articles.map(article => assetImages.push(article.image));

function cacheImages(images) {
  return images.map(image => {
    if (typeof image === 'string') {
      return Image.prefetch(image);
    } else {
      return Asset.fromModule(image).downloadAsync();
    }
  });
}

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoadingComplete: false,
      fontLoaded: false,
      userToken: null
    };
    this.handleUserChange = this.handleUserChange.bind(this);
  }




  async componentDidMount() {
    try {
      await getData().then(storage => {
        let user = JSON.parse(storage);
        console.log(user.foundUser, "This is the user data found when App.js mounts, and it's being set to" +
          "userToken state.");
        this.setState({...this.state, userToken: user.foundUser });
      })
    } catch (e) {
      console.log(e)
    }
  }

  handleUserChange(userData) {
    if (userData) {
      this.setState({userToken: userData })
    } else {
      console.log("Handle user change is clearing state context in App.js")
      this.setState({userToken: null })
    }
  }

  render() {
    if (!this.state.isLoadingComplete) {
      return (
        <AppLoading
          startAsync={this._loadResourcesAsync}
          onError={this._handleLoadingError}
          onFinish={this._handleFinishLoading}
        />
      );
    } else {
      return (
        <AuthProvider value={{ user: this.state.userToken, setUser: this.handleUserChange }}>
          <NavigationContainer>
            <GalioProvider theme={nowTheme}>
              <Block flex>
                <Screens />
              </Block>
            </GalioProvider>
          </NavigationContainer>
        </AuthProvider>
      );
    }
  }

  _loadResourcesAsync = async () => {
    await Font.loadAsync({
      'proxima-nova-thin': require('./assets/font/Proxima-Nova-Thin.otf'),
      'proxima-nova-light': require('./assets/font/Proxima-Nova-Light.otf'),
      'proxima-nova-regular': require('./assets/font/Proxima-Nova-Regular.ttf'),
      'proxima-nova': require('./assets/font/Proxima-Nova.ttf'),
      'montserrat-regular': require('./assets/font/Montserrat-Regular.ttf'),
      'montserrat-bold': require('./assets/font/Montserrat-Bold.ttf')
    });

    this.setState({fontLoaded: true });
    return Promise.all([...cacheImages(assetImages)]);
  };

  _handleLoadingError = error => {
    // In this case, you might want to report the error to your error
    // reporting service, for example Sentry
    console.warn(error);
  };

  _handleFinishLoading = () => {
    if (this.state.fontLoaded) {
      this.setState({ isLoadingComplete: true });
    }
  };
}
