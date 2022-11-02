import 'react-native-gesture-handler';
import React, { useEffect, useReducer } from "react";
import {
  SafeAreaView,
  StyleSheet,
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useFonts } from 'expo-font';
import { AuthContextProvider } from "./src/contexts/AuthContext";
import { cleanData, getToken } from "./src/storage/Storage";
import MenuDrawer from './src/components/menu-drawer/MenuDrawer';
import ClassesFormPage from './src/pages/classes/ClassesForm';
import LoginPage from './src/pages/login/LoginPage';
import FrequenciaUpdatePage from './src/pages/frequencia/FrequenciaUpdatePage';

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

  // useEffect(() => {
  //   const checkUserToken = () => {
  //     if(state.userToken == null){
  //       cleanData();
  //     }
  //   };

  //   checkUserToken();
  // }, [state.userToken]);

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
                <Stack.Screen options={{headerShown: false, animationEnabled: true}} 
                              name="LoginPage" 
                              component={LoginPage} />
              ) : (
                <>
                <Stack.Screen options={{headerShown: false, animationEnabled: true}} 
                              name="HomePage" 
                              component={MenuDrawer} />
                <Stack.Screen options={{animationEnabled: true, headerTitle: ''}} 
                              name="ClassesFormPage" 
                              component={ClassesFormPage}
                              />                              
                </>                              
              )
            }
            <Stack.Screen name="Lançar Frequencia" component={FrequenciaUpdatePage} />
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