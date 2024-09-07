import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';

const Login: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  const handleLogin = () => {
    console.log(`Username: ${username}, Password: ${password}, Remember Me: ${rememberMe}`);
  };

  return (
    <View style={styles.container}>

      {/* Login Form Section */}
      <Text style={styles.title}>Login</Text>

      <TextInput
        placeholder="Username/email"
        value={username}
        onChangeText={setUsername}
        style={styles.input}
      />

      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.input}
      />

      <View style={styles.rememberMeContainer}>
        <TouchableOpacity onPress={() => setRememberMe(!rememberMe)}>
          <View style={styles.checkbox}>
            {rememberMe && (
              <Image
                source={require('../components/images/checkmark.png')} // Make sure you have this image
                style={styles.checkmark}
              />
            )}
          </View>
        </TouchableOpacity>
        <Text style={styles.rememberMeText}>Remember Me</Text>
      </View>

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.linkButton}>
        <Text style={styles.normalText}>Forgot password? </Text>
        <TouchableOpacity onPress={() => {/* Handle password reset here */}}>
          <Text style={styles.linkText}>Click here</Text>
        </TouchableOpacity>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },

  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'black',
    marginBottom: 30,
  },
  input: {
    width: '100%',
    height: 50,
    backgroundColor: '#f1f1f1',
    borderRadius: 10,
    paddingHorizontal: 15,
    marginVertical: 10,
    fontSize: 16,
  },
  rememberMeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderColor: '#855CDD',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  checkmark: {
    width: 10,
    height: 13,
  },
  rememberMeText: {
    fontSize: 14,
    color: '#666',
  },
  button: {
    width: '100%',
    height: 50,
    backgroundColor: '#855CDD',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginVertical: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  linkButton: {
    flexDirection: 'row',
    marginTop: 20,
  },
  normalText: {
    color: 'black',
    fontSize: 16,
  },
  linkText: {
    color: '#855CDD',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Login;
