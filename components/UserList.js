import React, { useState, useEffect } from 'react';
import { SafeAreaView, FlatList, StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Appbar, Button as PaperButton } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const UserList = ({ navigation }) => {
  const [users, setUsers] = useState([]);
  const [passwordVisible, setPasswordVisible] = useState({});

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    const storedUsers = await AsyncStorage.getItem('users');
    const users = storedUsers ? JSON.parse(storedUsers) : {};
    setUsers(Object.keys(users).map(username => ({ username, password: users[username] })));
  };

  const removeUser = async (username) => {
    const storedUsers = await AsyncStorage.getItem('users');
    const users = storedUsers ? JSON.parse(storedUsers) : {};
    delete users[username];
    await AsyncStorage.setItem('users', JSON.stringify(users));

    // Hapus data todolist pengguna
    await AsyncStorage.removeItem(`tasks_${username}`);
    
    loadUsers();
  };

  const togglePasswordVisibility = (username) => {
    setPasswordVisible(prevState => ({
      ...prevState,
      [username]: !prevState[username],
    }));
  };

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Text>Username: {item.username}</Text>
      <View style={styles.passwordContainer}>
        <Text>Password: {passwordVisible[item.username] ? item.password : '******'}</Text>
        <TouchableOpacity onPress={() => togglePasswordVisibility(item.username)}>
          <Icon name={passwordVisible[item.username] ? 'eye-off' : 'eye'} size={24} color="#3F60D3" />
        </TouchableOpacity>
      </View>
      <TouchableOpacity onPress={() => removeUser(item.username)}>
        <Text style={styles.delete}>Delete</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title="User List" />
      </Appbar.Header>
      <FlatList
        data={users}
        renderItem={renderItem}
        keyExtractor={item => item.username}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  item: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  delete: {
    color: 'red',
    marginTop: 8,
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default UserList;
