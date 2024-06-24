import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { List, Checkbox } from 'react-native-paper';

const TaskItem = ({ item, toggleTask, startEditTask, removeTask }) => (
  <List.Item
    style={styles.checkBoxs}
    title={`${item.text} (Due: ${new Date(item.deadline).toLocaleString()})`}
    titleStyle={item.completed ? styles.completedTask : null}
    left={props => (
      <Checkbox
        style={styles.checkBoxes}
        status={item.completed ? 'checked' : 'unchecked'}
        onPress={() => toggleTask(item.key)}
        color="#3F60D3"
      />
    )}
    right={props => (
      <View style={styles.actions}>
        <TouchableOpacity onPress={() => startEditTask(item)}>
          <List.Icon {...props} icon="pencil" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => removeTask(item)}>
          <List.Icon {...props} icon="delete" />
        </TouchableOpacity>
      </View>
    )}
  />
);

const styles = StyleSheet.create({
  completedTask: {
    textDecorationLine: 'line-through',
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkBoxs: {
    marginLeft: 15,
  },
});

export default TaskItem;
