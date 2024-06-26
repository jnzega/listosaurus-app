import React from 'react';
import { View, TouchableOpacity, StyleSheet, Text } from 'react-native';
import { List, Checkbox } from 'react-native-paper';

const TaskItem = ({ item, toggleTask, startEditTask, removeTask, isLast }) => (
  <View style={styles.container}>
    <List.Item
      style={styles.item}
      title={
        <View>
          <Text style={item.completed ? styles.completedTask : null}>{item.text}</Text>
          <Text style={styles.deadline}>{`Due: ${new Date(item.deadline).toLocaleString()}`}</Text>
        </View>
      }
      left={props => (
        <Checkbox
          style={styles.checkBox}
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
    {!isLast && <View style={styles.separator} />}
  </View>
);

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    marginLeft: 17,
  },
  item: {
    paddingVertical: 10,
  },
  completedTask: {
    textDecorationLine: 'line-through',
  },
  deadline: {
    color: '#888',
    fontSize: 12,
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  separator: {
    height: 1,
    backgroundColor: '#E0E0E0',
    marginHorizontal: 10,
  },
});

export default TaskItem;
