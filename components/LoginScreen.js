import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, View, Text, TouchableOpacity } from 'react-native';
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
    const storedUsers = await AsyncStorage.getItem('users');
    const users = storedUsers ? JSON.parse(storedUsers) : {};

    if (users[username] && users[username] === password) {
      const role = (username === 'admin' && password === '123') ? 'admin' : 'user';
      await AsyncStorage.setItem('loggedInUser', JSON.stringify({ username, role }));
      navigation.replace('Main');
    } else {
      setError('Invalid username or password');
    }
  };

  const handleRegister = async () => {
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
        <PaperTextInput
          label="Username"
          value={username}
          onChangeText={setUsername}
          style={styles.input}
          theme={{
            colors: {
              placeholder: '#3F60D3', // Warna placeholder
              text: '#000000', // Warna teks
              primary: '#3F60D3', // Warna underline saat aktif
              underlineColor: 'transparent', // Menghapus underline default
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
                placeholder: '#3F60D3', // Warna placeholder
                text: '#000000', // Warna teks
                primary: '#3F60D3', // Warna underline saat aktif
                underlineColor: 'transparent', // Menghapus underline default
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
                  placeholder: '#3F60D3', // Warna placeholder
                  text: '#000000', // Warna teks
                  primary: '#3F60D3', // Warna underline saat aktif
                  underlineColor: 'transparent', // Menghapus underline default
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
          {isRegistering ? 'Register' : 'Login'}
        </PaperButton>
        <TouchableOpacity onPress={() => setIsRegistering(!isRegistering)}>
          <Text style={styles.switchText}>
            {isRegistering ? 'Already have an account? ' : 'Don\'t have an account? '}
            <Text style={styles.switchLink}>{isRegistering ? 'Login' : 'Register'}</Text>
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
});

export default LoginScreen;
