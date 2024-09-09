import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import HomeScreen from '../screens/HomeScreen';
import Login from '../screens/Login';
import Register from '../screens/Register';

import PatientHome from '../screens/Patient/PatientHome';

import CuraHome from '../screens/Cura/CuraHome';

export type RootStackParamList = {
  Home: undefined;
  Login: undefined;
  Register: undefined;

  PatientHome: undefined;

  CuraHome: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

const AppNavigator = () => {
  const navigation = useNavigation(); // Use navigation hook here

  const headerOptions = (title: string) => ({
    title,
    headerLeft: () => (
      <TouchableOpacity onPress={() => navigation.goBack()} style={{ marginLeft: 10 }}>
        <Image
          source={require('../components/images/back.png')}
          style={{ width: 24, height: 24 }}
        />
      </TouchableOpacity>
    ),
    headerTitle: () => (
      <Image
        source={require('../components/images/logo.png')}
        style={{ width: 120, height: 35, marginLeft: 2 }}
      />
    ),
  });

  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={headerOptions('Home')}
      />
      <Stack.Screen
        name="Login"
        component={Login}
        options={headerOptions('Login')}
      />
      <Stack.Screen
        name="Register"
        component={Register}
        options={headerOptions('Register')}
      />
      <Stack.Screen
        name="PatientHome"
        component={PatientHome}
        options={headerOptions('PatientHome')}
      />
    </Stack.Navigator>
  );
};

export default AppNavigator;
