import React, { useState, useEffect } from 'react';
import { SafeAreaView, FlatList, StyleSheet, View, Text } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Provider as PaperProvider, Appbar, FAB, List, Dialog, Portal, TextInput as PaperTextInput, Button as PaperButton, ProgressBar, Checkbox } from 'react-native-paper';

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [visible, setVisible] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    loadTasks();
  }, []);

  useEffect(() => {
    calculateProgress();
  }, [tasks]);

  const loadTasks = async () => {
    try {
      const storedTasks = await AsyncStorage.getItem('tasks');
      if (storedTasks) {
        setTasks(JSON.parse(storedTasks));
      }
    } catch (error) {
      console.error(error);
    }
  };

  const saveTasks = async (tasks) => {
    try {
      await AsyncStorage.setItem('tasks', JSON.stringify(tasks));
    } catch (error) {
      console.error(error);
    }
  };

  const addTask = () => {
    if (newTask.trim()) {
      const updatedTasks = [...tasks, { key: Date.now().toString(), text: newTask, completed: false }];
      setTasks(updatedTasks);
      saveTasks(updatedTasks);
      setNewTask('');
      setVisible(false);
    }
  };

  const toggleTask = (taskKey) => {
    const updatedTasks = tasks.map(task =>
      task.key === taskKey ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
    saveTasks(updatedTasks);
  };

  const removeTask = (taskKey) => {
    const updatedTasks = tasks.filter(task => task.key !== taskKey);
    setTasks(updatedTasks);
    saveTasks(updatedTasks);
  };

  const calculateProgress = () => {
    const completedTasks = tasks.filter(task => task.completed).length;
    const totalTasks = tasks.length;
    const progress = totalTasks > 0 ? completedTasks / totalTasks : 0;
    setProgress(progress);
  };

  return (
    <PaperProvider>
      <SafeAreaView style={styles.container}>
        <Appbar.Header>
          <Appbar.Content title="To-Do List" />
        </Appbar.Header>
        <ProgressBar progress={progress} style={styles.progressBar} />
        <Text style={styles.progressText}>{Math.round(progress * 100)}%</Text>
        <FlatList
          data={tasks}
          renderItem={({ item }) => (
            <List.Item
              title={item.text}
              titleStyle={item.completed ? styles.completedTask : null}
              left={props => (
                <Checkbox
                  status={item.completed ? 'checked' : 'unchecked'}
                  onPress={() => toggleTask(item.key)}
                />
              )}
              right={props => <List.Icon {...props} icon="delete" onPress={() => removeTask(item.key)} />}
            />
          )}
          keyExtractor={item => item.key}
        />
        <FAB
          style={styles.fab}
          small
          icon="plus"
          onPress={() => setVisible(true)}
        />
        <Portal>
          <Dialog visible={visible} onDismiss={() => setVisible(false)}>
            <Dialog.Title>Add Task</Dialog.Title>
            <Dialog.Content>
              <PaperTextInput
                label="New Task"
                value={newTask}
                onChangeText={text => setNewTask(text)}
              />
            </Dialog.Content>
            <Dialog.Actions>
              <PaperButton onPress={addTask}>Add</PaperButton>
            </Dialog.Actions>
          </Dialog>
        </Portal>
      </SafeAreaView>
    </PaperProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
  progressBar: {
    height: 10,
    margin: 16,
  },
  progressText: {
    textAlign: 'center',
    marginBottom: 8,
    fontSize: 18,
  },
  completedTask: {
    textDecorationLine: 'line-through',
  },
});

export default App;
