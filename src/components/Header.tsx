import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

type HeaderProps = {
  title: string;
};

const Header: React.FC<HeaderProps> = ({ title }) => {
  return (
    <View style={styles.headerContainer}>
      <View style={styles.logoContainer}>
        <Image source={require('../components/images/logo.png')} style={styles.logo} />
      </View>
      <Text style={styles.title}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff', // Adjust as needed
  },
  logoContainer: {
    marginRight: 10, // Space between logo and title
  },
  logo: {
    width: 120,
    height: 30,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333', // Adjust color as per your theme
  },
});

export default Header;
