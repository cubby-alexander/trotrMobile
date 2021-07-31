import AsyncStorage from '@react-native-async-storage/async-storage';

export default async function storeData (token) {
  if (token) {
    const data = JSON.stringify(token)
    try {
      await AsyncStorage.setItem(
        '@token',
        data
      );
    } catch (error) {
      // Error saving data
    }
  } else {
    await AsyncStorage.removeItem('@token');
  }
}
