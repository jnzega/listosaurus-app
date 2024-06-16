import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, View, Text } from 'react-native';
import { TextInput as PaperTextInput, Button as PaperButton } from 'react-native-paper';

const LoginScreen = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = () => {
    if (username === 'admin' && password === '123') {
      navigation.replace('Main');
    } else {
      setError('Invalid username or password');
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
        />
        <PaperTextInput
          label="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          style={styles.input}
        />
        {error ? <Text style={styles.errorText}>{error}</Text> : null}
        <PaperButton mode="contained" onPress={handleLogin} style={styles.button}>
          Login
        </PaperButton>
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
    marginBottom: 16,
  },
  button: {
    marginTop: 16,
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
  },
});

export default LoginScreen;
