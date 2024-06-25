import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, View, Text, TouchableOpacity, Image } from 'react-native';
import { TextInput as PaperTextInput, Button as PaperButton } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const LoginScreen = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);
  const [error, setError] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

  const handleLogin = async () => {
    const trimmedUsername = username.trimEnd();
    const storedUsers = await AsyncStorage.getItem('users');
    const users = storedUsers ? JSON.parse(storedUsers) : {};

    if (users[trimmedUsername] && users[trimmedUsername] === password) {
      const role = (trimmedUsername === 'admin' && password === '123') ? 'admin' : 'user';
      await AsyncStorage.setItem('loggedInUser', JSON.stringify({ username: trimmedUsername, role }));
      navigation.replace('Main');
    } else {
      setError('Invalid username or password');
    }
  };

  const handleRegister = async () => {
    if (/\s/.test(username)) {
      setError('Username must not contain spaces. Use ".", "_" or "-" instead.');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    const storedUsers = await AsyncStorage.getItem('users');
    const users = storedUsers ? JSON.parse(storedUsers) : {};

    if (!users[username]) {
      users[username] = password;
      await AsyncStorage.setItem('users', JSON.stringify(users));
      await AsyncStorage.setItem('loggedInUser', JSON.stringify({ username, role: 'user' }));
      navigation.replace('Main');
    } else {
      setError('Username already exists');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.loginContainer}>
        <Image source={require('../assets/icon.png')} style={styles.logo} />
        <PaperTextInput
          label="Username"
          value={username}
          onChangeText={setUsername}
          style={styles.input}
          theme={{
            colors: {
              placeholder: '#3F60D3', 
              text: '#000000',
              primary: '#3F60D3',
              underlineColor: 'transparent',
            },
          }}
        />
        <View style={styles.passwordContainer}>
          <PaperTextInput
            label="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={!passwordVisible}
            style={styles.passwordInput}
            theme={{
              colors: {
                placeholder: '#3F60D3',
                text: '#000000',
                primary: '#3F60D3',
                underlineColor: 'transparent',
              },
            }}
          />
          <TouchableOpacity onPress={() => setPasswordVisible(!passwordVisible)}>
            <Icon name={passwordVisible ? 'eye-off' : 'eye'} size={24} color="#3F60D3" />
          </TouchableOpacity>
        </View>
        {isRegistering && (
          <View style={styles.passwordContainer}>
            <PaperTextInput
              label="Confirm Password"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              secureTextEntry={!confirmPasswordVisible}
              style={styles.passwordInput}
              theme={{
                colors: {
                  placeholder: '#3F60D3',
                  text: '#000000', 
                  primary: '#3F60D3', 
                  underlineColor: 'transparent',
                },
              }}
            />
            <TouchableOpacity onPress={() => setConfirmPasswordVisible(!confirmPasswordVisible)}>
              <Icon name={confirmPasswordVisible ? 'eye-off' : 'eye'} size={24} color="#3F60D3" />
            </TouchableOpacity>
          </View>
        )}
        {error ? <Text style={styles.errorText}>{error}</Text> : null}
        <PaperButton mode="contained" onPress={isRegistering ? handleRegister : handleLogin} style={styles.button}>
          {isRegistering ? 'Sign Up' : 'Sign In'}
        </PaperButton>
        <TouchableOpacity onPress={() => setIsRegistering(!isRegistering)}>
          <Text style={styles.switchText}>
            {isRegistering ? 'Already have an account? ' : 'Don\'t have an account? '}
            <Text style={styles.switchLink}>{isRegistering ? 'Sign In' : 'Sign Up'}</Text>
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  loginContainer: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  input: {
    backgroundColor: '#fff',
    marginBottom: 16,
  },
  passwordInput: {
    backgroundColor: '#fff',
    flex: 1,
  },
  button: {
    marginTop: 16,
    backgroundColor: '#3F60D3'
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
  },
  switchText: {
    textAlign: 'center',
    color: '#000',
    marginTop: 16,
  },
  switchLink: {
    color: '#3F60D3',
    fontWeight: 'bold',
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  logo: {
    width: 100,  // Atur lebar gambar sesuai kebutuhan
    height: 100,  // Atur tinggi gambar sesuai kebutuhan
    alignSelf: 'center',
    marginBottom: 16,
  },
});

export default LoginScreen;
