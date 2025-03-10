import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import AuthStack from './AuthStack';
import NonAuthStack from './NonAuthStack';
import ToDoBottomNavigation from './ToDoBottomNavigation';
import {useSelector} from 'react-redux';
import SplashScreen from '../screens/auth/SplashScreen';

const MainStack = () => {
  const Stack = createStackNavigator();
  const loggedIn = useSelector(state => state.loginReducer.loggedIn);

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="SplashScreen"
        screenOptions={{headerShown: false}}>
        <Stack.Screen name="SplashScreen" component={SplashScreen} />
        <Stack.Screen name="NonAuthStack" component={NonAuthStack} />
        <Stack.Screen name="AuthStack" component={AuthStack} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MainStack;
