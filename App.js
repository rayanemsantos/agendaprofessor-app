import React, { useCallback, useEffect } from "react";
import {
  SafeAreaView,
  StyleSheet,
  View
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useFonts, load } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import LoginPage from './src/pages/login/LoginPage';

const bold = require('./src/assets/fonts/Montserrat-Bold.ttf');
const medium = require('./src/assets/fonts/Montserrat-Medium.ttf');
const regular = require('./src/assets/fonts/Montserrat-Regular.ttf');

const Stack = createNativeStackNavigator();
export const AuthContext = React.createContext();

function App() {

  const [fontsLoaded] = useFonts({
    'MontserratBold': bold,
    'MontserratMedium': medium,
    'MontserratRegular': regular,
  });
  
  if (!fontsLoaded) {
    return <></>;
  }
  
  return (
    <SafeAreaView style={styles.container}>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerBackTitleVisible: false,
          }}
        >
        <Stack.Screen options={{headerShown: false, animationEnabled: true}} name="LoginPage" component={LoginPage} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
  },
  text: {
    fontSize: 25,
    fontWeight: '500',
  }
});


export default App;