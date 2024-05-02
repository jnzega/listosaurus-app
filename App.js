import { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TextInput, Button, TouchableOpacity, ScrollView} from 'react-native';
import axios from 'axios';

export default function App () {
  const [firstName, setFirstName] = useState('');
  const [lastName,setLastName] = useState('');
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [users, setUsers] = useState([]);

  //ambil data dr API
  const fetchData = async () => {
    try {
      const result = await axios.get('https://hendi-hermawan.com/pemrograman-bergerak-api.php');
      setUsers(result.data);
    } catch (error) {
      console.error('Failed to Fetch User', error);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  const handleAddorUpdate = async () => {

  }
  const handleDelete = async (id) => {
    try {
      await axios.delete('https://hendi-hermawan.com/pemrograman-bergerak-api.php',
      {data: { id }}
      );
      fetchData();
    } catch (error) {
      console.error('Failed to delete user:',error);
    }
  }
  return (
    <View style={styles.container}>
      <View>
        <TextInput style={styles.input} placeholder="Nama Depan" value={firstName} onChangeText={setFirstName} />
        <TextInput style={styles.input} placeholder="Nama Belakang" value={lastName} onChangeText={setLastName} />
        <Button title={selectedUserId ? 'Update User' : 'Add User'} onPress={handleAddorUpdate}/>
      </View>
      <ScrollView>
        {users.map((user) => (
        <View key={user.id} style={styles.userContainer}>
          <Text style={styles.userText}>{user.first_name} {user.last_name}</Text>
          <TouchableOpacity 
          style={styles.button}
          onPress={() => {
            setSelectedUserId(user.id);
            setFirstName(user.first_name);
            setLastName(user.last_name);
          }}
          >
            <Text>Edit</Text>
          </TouchableOpacity>
          <TouchableOpacity 
          style={styles.button}
          onPress={()=> handleDelete(user.id)}
          >
            <Text>Delete</Text>
          </TouchableOpacity>
        </View>
        ))}
      </ScrollView>
    </View>
  )
}
const styles = StyleSheet.create ({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  input: {
    height: 40,
    borderColor:'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  userContainer: {
    flexDirection:'row',
    justifyContent: 'space-between',
    alignItems:'center',
    marginVertical: 10,
  },
  userText: {
    flex: 1,
  },
  button: {
    marginLeft: 10,
    padding: 10,
    backgroundColor:'#ddd',
    borderRadius: 5,
  },
});