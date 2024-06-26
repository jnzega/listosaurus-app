import React, { useState, useEffect } from 'react';
import { SafeAreaView, SectionList, StyleSheet, View, Text, TouchableOpacity, Dimensions } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Appbar, FAB, Dialog, Portal, TextInput as PaperTextInput, Button as PaperButton, ProgressBar } from 'react-native-paper';
import TaskItem from './TaskItem';
import * as Notifications from 'expo-notifications';

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
  const [confirmDialogVisible, setConfirmDialogVisible] = useState(false);
  const [dialogType, setDialogType] = useState('');
  const [selectedTask, setSelectedTask] = useState(null);
  const [userName, setUserName] = useState('');

  useEffect(() => {
    checkAdmin();
    loadTasks();
    loadUserName();
    registerForPushNotificationsAsync();
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

  const loadUserName = async () => {
    try {
      const user = await AsyncStorage.getItem('loggedInUser');
      const { username } = JSON.parse(user);
      setUserName(username);
    } catch (error) {
      console.error(error);
    }
  };

  const getGreeting = () => {
    const currentHour = new Date().getHours();
    if (currentHour >= 4 && currentHour < 12) {
      return 'Good Morning';
    } else if (currentHour >= 12 && currentHour < 17) {
      return 'Good Afternoon';
    } else {
      return 'Good Evening';
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

  const confirmSaveTask = () => {
    setDialogType('save');
    setConfirmDialogVisible(true);
  };

  const saveTask = () => {
    if (newTask.trim() && currentTask) {
      const updatedTasks = tasks.map(task =>
        task.key === currentTask.key ? { ...task, text: newTask, deadline } : task
      );
      setTasks(updatedTasks);
      saveTasks(updatedTasks);
      resetTaskForm();
      setConfirmDialogVisible(false);
    }
  };

  const toggleTask = (taskKey) => {
    const updatedTasks = tasks.map(task =>
      task.key === taskKey ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
    saveTasks(updatedTasks);
  };

  const confirmRemoveTask = (task) => {
    setSelectedTask(task);
    setDialogType('remove');
    setConfirmDialogVisible(true);
  };

  const removeTask = async () => {
    if (selectedTask) {
      const taskKey = selectedTask.key;
      const updatedTasks = tasks.filter(task => task.key !== taskKey);
      setTasks(updatedTasks);
      await saveTasks(updatedTasks);
      setSelectedTask(null);
      setConfirmDialogVisible(false);
    }
  };

  const calculateProgress = () => {
    const completedTasks = tasks.filter(task => task.completed).length;
    const totalTasks = tasks.length;
    const progress = totalTasks > 0 ? completedTasks / totalTasks : 0;
    setProgress(progress);
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

  const scheduleNotification = async (task) => {
    const timeDiff = new Date(task.deadline).getTime() - new Date().getTime();
    if (timeDiff > 0 && timeDiff <= 30 * 60 * 1000) {
      await Notifications.scheduleNotificationAsync({
        content: {
          title: "Task Deadline Approaching",
          body: `Your task "${task.text}" is due soon!`,
        },
        trigger: { seconds: Math.floor(timeDiff / 1000) },
      });
    }
  };

  const registerForPushNotificationsAsync = async () => {
    const { status } = await Notifications.requestPermissionsAsync();
    if (status !== 'granted') {
      alert('Failed to get push token for push notification!');
      return;
    }
    const token = (await Notifications.getExpoPushTokenAsync()).data;
    console.log(token);
  };

  const renderTask = ({ item, index, section }) => {
    const isLast = index === section.data.length - 1;
    return (
      <TaskItem
        item={item}
        toggleTask={toggleTask}
        startEditTask={startEditTask}
        removeTask={confirmRemoveTask}
        isLast={isLast}
      />
    );
  };

  useEffect(() => {
    tasks.forEach(task => {
      if (!task.completed) {
        scheduleNotification(task);
      }
    });
  }, [tasks]);

  const incompleteTasks = tasks.filter(task => !task.completed);
  const completedTasks = tasks.filter(task => task.completed);

  const showDatePickerModal = () => {
    setShowDatePicker(true);
  };

  const showTimePickerModal = () => {
    setShowTimePicker(true);
  };

  const onDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || deadline;
    setShowDatePicker(false);
    setDeadline(currentDate);
  };

  const onTimeChange = (event, selectedTime) => {
    const currentTime = selectedTime || deadline;
    setShowTimePicker(false);
    setDeadline(currentTime);
  };

  const currentDate = new Date().toLocaleDateString();
  const currentYear = new Date().getFullYear();
  const totalTasks = tasks.length;
  const remainingTasks = incompleteTasks.length;

  return (
    <SafeAreaView style={styles.container}>
      <Appbar.Header>
        <View style={styles.appbarContent}>
          <Text style={styles.appbarText}>
            Hi,
            <Text style={styles.userNameText}>
              {` ${userName}`}
            </Text>
          </Text>
          <Text style={styles.appbarText}>{getGreeting()}</Text>
        </View>
        <Appbar.Action
          icon="logout"
          onPress={handleLogout}
        />
        {isAdmin && (
          <Appbar.Action
            icon="account"
            onPress={() => navigation.navigate('UserList')}
          />
        )}
      </Appbar.Header>
      <View style={styles.barContainer}>
        <Text style={styles.dateText}>{currentDate}</Text>
        <Text style={styles.titleText}>Your today's progress</Text>
        <Text style={styles.tasksCompletedText}>{`${totalTasks - remainingTasks}/${totalTasks} Tasks completed`}</Text>
        <Text style={styles.progressText}>{Math.round(progress * 100)}%</Text>
        <ProgressBar
          progress={progress}
          style={styles.progressBar}
          color="#FFFFFF"
        />
      </View>
      <SectionList
        sections={[
          { title: 'Undone', data: incompleteTasks },
          { title: 'Completed', data: completedTasks }
        ]}
        renderItem={renderTask}
        renderSectionHeader={({ section }) => (
          <View>
            {section.title === 'Undone' && (
              <Text style={styles.sectionTitle}>
              {section.title}
              {` (${remainingTasks})`}
            </Text>
            )}
            {section.title === 'Completed' && (
              <Text style={styles.sectionTitle}>
              {section.title}
              {` (${totalTasks - remainingTasks})`}
            </Text>
            )}
            {section.title === 'Undone' && section.data.length === 0 && (
              <Text style={styles.emptyMessage}>
                Your task is empty
              </Text>
            )}
            {section.title === 'Completed' && section.data.length === 0 && (
              <Text style={styles.emptyMessage}>
                You haven't complete any task yet
              </Text>
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
        color="#FFFFFF"
      />
      <Portal>
        <Dialog
          visible={visible}
          onDismiss={resetTaskForm}
          style={styles.dialog}>
          <Dialog.Title style={styles.dialogTitle}>
            {currentTask ? "Edit Task" : "Add Task"}
          </Dialog.Title>
          <Dialog.Content style={styles.dialogContent}>
            <PaperTextInput
              label="Task Name"
              value={newTask}
              onChangeText={text => setNewTask(text)}
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
            <TouchableOpacity onPress={showDatePickerModal}>
              <View pointerEvents="none">
                <PaperTextInput
                  label="Deadline Date"
                  value={deadline.toLocaleDateString()}
                  style={styles.input}
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
                  style={styles.input}
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
            <PaperButton
              onPress={resetTaskForm}
              theme={{
                colors: {
                  primary: '#3F60D3',
                },
              }}
            >
              Cancel
            </PaperButton>
            <PaperButton
              onPress={currentTask ? confirmSaveTask : addTask}
              theme={{
                colors: {
                  primary: '#3F60D3',
                },
              }}
            >
              {currentTask ? "Save" : "Add"}
            </PaperButton>
          </Dialog.Actions>
        </Dialog>
      </Portal>

      <Portal>
        <Dialog
          visible={confirmDialogVisible}
          onDismiss={() => setConfirmDialogVisible(false)}
          style={styles.dialog}
        >
          <Dialog.Title style={styles.dialogTitle}>
            {dialogType === 'remove' ? 'Delete Task' : 'Save Change'}
          </Dialog.Title>
          <Dialog.Content>
            <Text>
              Are you sure want to {dialogType === 'remove' ? 'delete' : 'save the changes on'} this task?
            </Text>
          </Dialog.Content>
          <Dialog.Actions>
            <PaperButton
              onPress={() => setConfirmDialogVisible(false)}
              theme={{
                colors: {
                  primary: '#3F60D3',
                },
              }}
            >
              Cancel
            </PaperButton>
            <PaperButton
              onPress={
                dialogType === 'remove'
                  ? removeTask
                  : saveTask
              }
              theme={{
                colors: {
                  primary: '#3F60D3',
                },
              }}
            >
              {dialogType === 'remove' ? 'Delete' : 'Change'}
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
  dialog: {
    backgroundColor: '#fff',
  },
  dialogTitle: {
    color: '#3F60D3',
    fontWeight: 'bold',
  },
  dialogContent: {
    backgroundColor: '#fff',
  },
  input: {
    backgroundColor: '#FFFFFF',
    marginBottom: 16,
  },
  buttonInput: {
    color: '#3F60D3',
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
    height: 45,
    borderRadius: 10,
    backgroundColor: 'transparent',
  },
  progressText: {
    textAlign: 'left',
    fontSize: 75,
    fontWeight: 'bold',
    color: '#fff',
  },
  sectionTitle: {
    fontSize: 25,
    fontWeight: 'bold',
    marginLeft: 25,
    color: '#B2B2B2',
    backgroundColor: '#fff',
  },
  emptyMessage: {
    fontSize: 16,
    color: '#888',
    marginLeft: 25,
    marginTop: 8,
    marginBottom: 20,
    opacity: 0.4,
  },
  completedTask: {
    textDecorationLine: 'line-through',
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  appbarContent: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
    flex: 1,
    marginLeft: 16,
    marginTop: 20,
  },
  appbarText: {
    color: '#B2B2B2',
    fontSize: 25,
    fontWeight: 'bold',
  },
  barContainer: {
    backgroundColor: '#3F60D3',
    height: 225,
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 16,
    marginTop: 16,
    borderRadius: 25,
    justifyContent: 'flex-end',
    padding: 16,
  },
  userNameText: {
    color: '#3F60D3',
  },
  tasksCompletedText: {
    fontSize: 12,
    color: '#fff',
    marginBottom: -20,
  },
  dateText: {
    fontSize: 12,
    marginBottom: -5,
    color: '#fff',
  },
  titleText: {
    fontSize: 20,
    color: '#fff',
    marginBottom: 15,
    fontWeight: 'bold',
  }
});

export default MainScreen;
