import React from 'react';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import { Image, TouchableOpacity, View, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import HomeScreen from '../screens/HomeScreen';
import Login from '../screens/Login';
import Register from '../screens/Register';

import PatientHome from '../screens/Patient/PatientHome';

import BookingSummary from '../screens/Patient/BookingSummary';


import Booking1 from '../screens/Patient/Booking/Booking1';
import Booking2 from '../screens/Patient/Booking/Booking2';
import Booking3 from '../screens/Patient/Booking/Booking3';

import Appointments1 from '../screens/Patient/Appointment/Appointments1';

import Doctors from '../screens/Patient/Doctors';
import Main from '../screens/Patient/Main';
import CuraHome from '../screens/Cura/CuraHome';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

// Custom drawer content
function CustomDrawerContent(props) {
  const { navigation, state } = props;
  const activeRoute = state.routeNames[state.index];  // Get the active route

  const drawerItems = [
    { label: 'Home', route: 'PatientHome' },
    { label: 'New Booking', route: 'Booking1' },
    { label: 'Appointments', route: 'Appointments1' },
    { label: 'Doctors', route: 'Doctors' },
    { label: 'Chat with Cura', route: 'CuraHome' },
  ];

  return (
    <DrawerContentScrollView {...props}>
      <View style={styles.logoContainer}>
        <Image
          source={require('../components/images/logo.png')}
          style={styles.logo}
        />
      </View>
      {drawerItems.map((item) => (
        <DrawerItem
          key={item.route}
          label={item.label}
          onPress={() => {
            console.log(`Navigating to: ${item.route}`); // Debugging line
            navigation.navigate(item.route);
          }}
          labelStyle={activeRoute === item.route ? styles.selectedLabel : styles.label}
          style={activeRoute === item.route ? styles.selectedItem : styles.item}
        />
      ))}
    </DrawerContentScrollView>
  );
}

// Styles for the logo and container
const styles = StyleSheet.create({
  logoContainer: {
    alignItems: 'center',
    marginVertical: 20,
  },
  logo: {
    width: 145,
    height: 45,
    resizeMode: 'contain',
  },
  label: {
    color: '#000',  // Default color for drawer items
  },
  selectedLabel: {
    color: '#855CDD',  // Color for the selected drawer item
  },
  item: {
    backgroundColor: 'transparent',  // Default background for drawer items
  },
  selectedItem: {
    backgroundColor: '#EAEAEA',  // Background color for the selected drawer item
  },
});

// Stack navigator for Login, Register, and HomeScreen
function AuthStackNavigator() {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Login"
        component={Login}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Register"
        component={Register}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}

// Main stack navigator for the screens that should have a drawer
function MainStackNavigator() {
  const navigation = useNavigation();
  const headerOptions = (title: string) => ({
    title,
    headerLeft: () => (
      <TouchableOpacity onPress={() => navigation.toggleDrawer()} style={{ marginLeft: 10 }}>
        <Image
          source={require('../components/images/hamburger.png')}
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
    <Stack.Navigator>
      <Stack.Screen
        name="PatientHome"
        component={PatientHome}
        options={headerOptions('Patient Home')}
      />



      <Stack.Screen
        name="Booking1"
        component={Booking1}
        options={headerOptions('Booking 1')}
      />
      <Stack.Screen
        name="Booking2"
        component={Booking2}
        options={headerOptions('Booking 2')}
      />
      <Stack.Screen
        name="Booking3"
        component={Booking3}
        options={headerOptions('Booking 3')}
      />
      <Stack.Screen
        name="Appointments1"
        component={Appointments1}
        options={headerOptions('Appointments1')}
      />
      <Stack.Screen
        name="Doctors"
        component={Doctors}
        options={headerOptions('Doctors')}
      />

      <Stack.Screen
              name="BookingSummary"
              component={BookingSummary}
              options={headerOptions('BookingSummary')}
            />
      <Stack.Screen
        name="CuraHome"
        component={CuraHome}
        options={headerOptions('Cura Home')}
      />
    </Stack.Navigator>
  );
}

// Drawer navigator setup
const DrawerNavigator = () => {
  return (
    <Drawer.Navigator
      drawerContent={props => <CustomDrawerContent {...props} />}
      screenOptions={{ headerShown: false }}
    >
      <Drawer.Screen name="Home" component={MainStackNavigator} />
    </Drawer.Navigator>
  );
};

// Main app navigator
const AppNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="AuthStack"
        component={AuthStackNavigator}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="DrawerStack"
        component={DrawerNavigator}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default AppNavigator;
