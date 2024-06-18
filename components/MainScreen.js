import React, { useState, useEffect } from 'react';
import { SafeAreaView, FlatList, StyleSheet, View, Text, SectionList, Dimensions, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Appbar, FAB, List, Dialog, Portal, TextInput as PaperTextInput, Button as PaperButton, ProgressBar, Checkbox } from 'react-native-paper';
import TaskItem from './TaskItem';

const MainScreen = ({ navigation }) => {
  const [tasks, setTasks] = useState([]);
  const [currentTask, setCurrentTask] = useState(null);
  const [newTask, setNewTask] = useState('');
  const [deadline, setDeadline] = useState(new Date());
  const [visible, setVisible] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    checkAdmin();
    loadTasks();
  }, []);

  useEffect(() => {
    calculateProgress();
  }, [tasks]);

  const checkAdmin = async () => {
    const user = await AsyncStorage.getItem('loggedInUser');
    const { role } = JSON.parse(user);
    setIsAdmin(role === 'admin');
  };

  const loadTasks = async () => {
    try {
      const user = await AsyncStorage.getItem('loggedInUser');
      const { username } = JSON.parse(user);
      const storedTasks = await AsyncStorage.getItem(`tasks_${username}`);
      if (storedTasks) {
        setTasks(JSON.parse(storedTasks));
      }
    } catch (error) {
      console.error(error);
    }
  };

  const saveTasks = async (tasks) => {
    try {
      const user = await AsyncStorage.getItem('loggedInUser');
      const { username } = JSON.parse(user);
      await AsyncStorage.setItem(`tasks_${username}`, JSON.stringify(tasks));
    } catch (error) {
      console.error(error);
    }
  };

  const addTask = () => {
    if (newTask.trim()) {
      const updatedTasks = [...tasks, { key: Date.now().toString(), text: newTask, deadline, completed: false }];
      setTasks(updatedTasks);
      saveTasks(updatedTasks);
      resetTaskForm();
    }
  };

  const editTask = () => {
    if (newTask.trim() && currentTask) {
      const updatedTasks = tasks.map(task =>
        task.key === currentTask.key ? { ...task, text: newTask, deadline } : task
      );
      setTasks(updatedTasks);
      saveTasks(updatedTasks);
      resetTaskForm();
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

  const showDatePickerModal = () => {
    setShowDatePicker(true);
  };

  const showTimePickerModal = () => {
    setShowTimePicker(true);
  };

  const onDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || deadline;
    setShowDatePicker(Platform.OS === 'ios');
    setDeadline(currentDate);
  };

  const onTimeChange = (event, selectedTime) => {
    const currentTime = selectedTime || deadline;
    setShowTimePicker(Platform.OS === 'ios');
    setDeadline(currentTime);
  };

  const startEditTask = (task) => {
    setCurrentTask(task);
    setNewTask(task.text);
    setDeadline(new Date(task.deadline));
    setVisible(true);
  };

  const resetTaskForm = () => {
    setNewTask('');
    setDeadline(new Date());
    setCurrentTask(null);
    setVisible(false);
  };

  const handleLogout = async () => {
    await AsyncStorage.removeItem('loggedInUser');
    navigation.replace('Login');
  };

  const renderTask = ({ item }) => (
    <TaskItem
      item={item}
      toggleTask={toggleTask}
      startEditTask={startEditTask}
      removeTask={removeTask}
    />
  );

  const incompleteTasks = tasks.filter(task => !task.completed);
  const completedTasks = tasks.filter(task => task.completed);

  return (
    <SafeAreaView style={styles.container}>
      <Appbar.Header>
        <Appbar.Content title="Listosaurus" />
        <Appbar.Action icon="logout" onPress={handleLogout} />
        {isAdmin && (
          <Appbar.Action icon="account" onPress={() => navigation.navigate('UserList')} />
        )}
      </Appbar.Header>
      <ProgressBar progress={progress} style={styles.progressBar} color="#3F60D3" />
      <Text style={styles.progressText}>{Math.round(progress * 100)}%</Text>
      
      <SectionList
        sections={[
          { title: 'Incomplete Tasks', data: incompleteTasks },
          { title: 'Completed Tasks', data: completedTasks }
        ]}
        renderItem={renderTask}
        renderSectionHeader={({ section }) => (
          <View>
            <Text style={styles.sectionTitle}>{section.title}</Text>
            {section.title === 'Incomplete Tasks' && section.data.length === 0 && (
              <Text style={styles.emptyMessage}>You've completed all your tasks, good job.</Text>
            )}
          </View>
        )}
        keyExtractor={item => item.key}
        stickySectionHeadersEnabled={true}
      />

      <FAB
        style={styles.fab}
        small
        icon="plus"
        onPress={() => setVisible(true)}
        color="#fff"
      />
      <Portal>
        <Dialog visible={visible} onDismiss={resetTaskForm}>
          <Dialog.Title>{currentTask ? "Edit Task" : "Add Task"}</Dialog.Title>
          <Dialog.Content>
            <PaperTextInput
              label="Task"
              value={newTask}
              onChangeText={text => setNewTask(text)}
            />
            <TouchableOpacity onPress={showDatePickerModal}>
              <View pointerEvents="none">
                <PaperTextInput
                  label="Deadline Date"
                  value={deadline.toLocaleDateString()}
                />
              </View>
            </TouchableOpacity>
            {showDatePicker && (
              <DateTimePicker
                value={deadline}
                mode="date"
                display="default"
                onChange={onDateChange}
              />
            )}
            <TouchableOpacity onPress={showTimePickerModal}>
              <View pointerEvents="none">
                <PaperTextInput
                  label="Deadline Time"
                  value={deadline.toLocaleTimeString()}
                />
              </View>
            </TouchableOpacity>
            {showTimePicker && (
              <DateTimePicker
                value={deadline}
                mode="time"
                display="default"
                onChange={onTimeChange}
              />
            )}
          </Dialog.Content>
          <Dialog.Actions>
            <PaperButton onPress={currentTask ? editTask : addTask}>
              {currentTask ? "Save" : "Add"}
            </PaperButton>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </SafeAreaView>
  );
};

const { height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  tasksContainer: {
    flex: 1,
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
    backgroundColor: '#3F60D3',
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
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 16,
    marginTop: 16,
  },
  emptyMessage: {
    fontSize: 16,
    color: '#888',
    marginLeft: 16,
    marginTop: 8,
    opacity: 0.7,
  },
  completedTask: {
    textDecorationLine: 'line-through',
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default MainScreen;
