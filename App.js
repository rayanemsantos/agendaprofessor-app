import React, { useMemo, useEffect, useReducer } from "react";
import {
  SafeAreaView,
  StyleSheet,
  View
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useFonts, load } from 'expo-font';
import { AsyncStorage } from 'react-native';
import * as SplashScreen from 'expo-splash-screen';
import LoginPage from './src/pages/login/LoginPage';
import HomePage from './src/pages/home/HomePage';
import { AuthContextProvider, useAuthContext } from "./src/contexts/AuthContext";
import { cleanData, getToken, setToken } from "./src/storage/Storage";

const bold = require('./src/assets/fonts/Montserrat-Bold.ttf');
const medium = require('./src/assets/fonts/Montserrat-Medium.ttf');
const regular = require('./src/assets/fonts/Montserrat-Regular.ttf');

const Stack = createNativeStackNavigator();

function App() {
  const [state, dispatch] = useReducer(
    (prevState, action) => {
      switch (action.type) {
        case 'RESTORE_TOKEN':
          return {
            ...prevState,
            userToken: action.token,
            isLoading: false,
          };
        case 'SIGN_IN':
          return {
            ...prevState,
            isSignout: false,
            userToken: action.token,
          };
        case 'SIGN_OUT':
          return {
            ...prevState,
            isSignout: true,
            userToken: null,
          };
      }
    },
    {
      isLoading: true,
      isSignout: false,
      userToken: null,
    }
  );

  useEffect(() => {
    const bootstrapAsync = async () => {
      let userToken;
      try {
        userToken = await getToken();
      } catch (e) {
      }
      dispatch({ type: 'RESTORE_TOKEN', token: userToken});
    };

    bootstrapAsync();
  }, []);

  useEffect(() => {
    const checkUserToken = () => {
      if(state.userToken == null){
        cleanData();
      }
    };

    checkUserToken();
  }, [state.userToken]);

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
        <AuthContextProvider dispatch={dispatch}>
          <Stack.Navigator
            screenOptions={{
              headerBackTitleVisible: false,
            }}
          >
            {
              state.userToken == null ? (
                <Stack.Screen options={{headerShown: false, animationEnabled: true}} name="LoginPage" component={LoginPage} />
              ) : (
                <Stack.Screen options={{headerShown: false, animationEnabled: true}} name="HomePage" component={HomePage} />
              )
            }
          </Stack.Navigator>
        </AuthContextProvider>
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