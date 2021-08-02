import AsyncStorage from '@react-native-async-storage/async-storage';

export async function storeData (token) {
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

export async function getData() {
  try {
    const user = await AsyncStorage.getItem('@token');
    console.log(user, "Found this crap");
    return user;
  } catch (e) {
    console.log("Error retrieving data. Check token helpers and data call.", e)
  }
}

export async function clearData() {
  try {
    await AsyncStorage.removeItem('@token')
  } catch(e) {
    console.log(e)
  }
  console.log('Done.')
}
