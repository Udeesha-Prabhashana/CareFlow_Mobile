import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import Toast from 'react-native-toast-message';

interface Credentials {
  email: string;
  password: string;
}

const Login: React.FC = () => {
  const navigation = useNavigation();
  const [credentials, setCredentials] = useState<Credentials>({
    email: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);

  const handleInputChange = (field: keyof Credentials, value: string) => {
    setCredentials((prev) => ({ ...prev, [field]: value }));
  };

  const setCookie = (name: string, value: string, daysToExpire: number) => {
    const date = new Date();
    date.setTime(date.getTime() + daysToExpire * 24 * 60 * 60 * 1000);
    const expires = `expires=${date.toUTCString()}`;
    // Setting a pseudo-cookie for demo; replace with secure storage for production
    console.log(`${name}=${value}; ${expires}; path=/`);
  };

  const handleLogin = async () => {
    if (!credentials.email || !credentials.password) {
      Toast.show({
        type: 'error',
        text1: 'Validation Error',
        text2: 'Email and password are required',
      });
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post(
        `http://10.0.2.2:8080/sign-in`,  // Backend URL (Emulator IP and port)
        null,
        {
          headers: {
            Authorization: `Basic ${btoa(
              `${credentials.email}:${credentials.password}`
            )}`,
          },
        }
      );

      const { access_token, access_token_expiry, user_role } = response.data;

      // Set cookie for authentication token
      setCookie('JWT', `Bearer ${access_token}`, access_token_expiry);

      Toast.show({
        type: 'success',
        text1: 'Login Successful',
        text2: 'Welcome back!',
      });

      // Navigate to the Drawer Navigator after successful login
      if (user_role === 'ROLE_USER') {
        navigation.reset({
          index: 0,
          routes: [{ name: 'DrawerStack' }],  // Reset to DrawerNavigator
        });

        // After resetting, navigate to the PatientHome screen
        navigation.navigate('PatientHome');
      } else if (user_role === 'ROLE_ADMIN') {
        // Navigate to admin home (adjust route as necessary)
        navigation.reset({
          index: 0,
          routes: [{ name: 'AdminHome' }],
        });
      } else if (user_role === 'ROLE_MANAGER') {
        // Navigate to manager home (adjust route as necessary)
        navigation.reset({
          index: 0,
          routes: [{ name: 'ManagerHome' }],
        });
      } else if (user_role === 'ROLE_DOCTOR') {
        // Navigate to doctor home (adjust route as necessary)
        navigation.reset({
          index: 0,
          routes: [{ name: 'DoctorHome' }],
        });
      }
    } catch (error: any) {
      console.error('Login error:', error);
      Toast.show({
        type: 'error',
        text1: 'Login Failed',
        text2: error.response?.data?.message || 'Something went wrong',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>

      <TextInput
        style={styles.input}
        placeholder="Email"
        value={credentials.email}
        onChangeText={(text) => handleInputChange('email', text)}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <TextInput
        style={styles.input}
        placeholder="Password"
        value={credentials.password}
        onChangeText={(text) => handleInputChange('password', text)}
        secureTextEntry
        autoCapitalize="none"
      />

      <TouchableOpacity style={styles.button} onPress={handleLogin} disabled={loading}>
        <Text style={styles.buttonText}>{loading ? 'Loading...' : 'Login'}</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('Register')}>
        <Text style={styles.linkText}>Don't have an account? Register</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#855CDD',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    height: 50,
    borderColor: '#ddd',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
    borderRadius: 10,
    fontSize: 16,
  },
  button: {
    backgroundColor: '#855CDD',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
  linkText: {
    color: '#855CDD',
    fontSize: 16,
    marginTop: 20,
    textAlign: 'center',
  },
});

export default Login;
