import React, { useState, useEffect } from 'react';
import { SafeAreaView, FlatList, StyleSheet, View, Text, TouchableOpacity, Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Appbar, FAB, List, Dialog, Portal, TextInput as PaperTextInput, Button as PaperButton, ProgressBar, Checkbox } from 'react-native-paper';
import TaskItem from './TaskItem';

const MainScreen = () => {
  const [tasks, setTasks] = useState([]);
  const [currentTask, setCurrentTask] = useState(null);
  const [newTask, setNewTask] = useState('');
  const [deadline, setDeadline] = useState(new Date());
  const [visible, setVisible] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
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

  return (
    <SafeAreaView style={styles.container}>
      <Appbar.Header>
        <Appbar.Content title="To-Do List" />
      </Appbar.Header>
      <ProgressBar progress={progress} style={styles.progressBar} />
      <Text style={styles.progressText}>{Math.round(progress * 100)}%</Text>
      <FlatList
        data={tasks}
        renderItem={({ item }) => (
          <TaskItem
            item={item}
            toggleTask={toggleTask}
            startEditTask={startEditTask}
            removeTask={removeTask}
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
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default MainScreen;
