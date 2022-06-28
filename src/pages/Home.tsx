import React, { useState } from 'react';
import { StyleSheet, View, Alert } from 'react-native';

import { Header } from '../components/Header';
import { Task, TasksList } from '../components/TasksList';
import { TodoInput } from '../components/TodoInput';

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  function handleAddTask(newTaskTitle: string) {
    const task = {
      id: new Date().getTime(),
      title: newTaskTitle,
      done: false
    }

    const hasTaskTitle = tasks.find(
      task => task.title === newTaskTitle
    )

    if (hasTaskTitle) {
      Alert.alert(
        'Task já cadastrada!',
        'Você não pode cadastrar uma task com o mesmo nome.'
      )
      return
    }

    setTasks([...tasks, task])
  }

  function handleToggleTaskDone(id: number) {
    if (!id) return
    setTasks(
      oldState => oldState.map(
        task => (task.id === id)
          ? { ...task, done: !task.done }
          : task
      )
    )
  }

  function handleRemoveTask(id: number) {

    Alert.alert(
      'Remover item',
      'Tem certeza que você deseja remover esse item?',
      [
        {
          text: 'Não',
          style: 'cancel'
        },
        {
          text: 'Sim',
          onPress: () => setTasks(
            oldState => oldState.filter(
              task => task.id !== id
            )
          )
        }
      ]
    )
  }

  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />

      <TodoInput addTask={handleAddTask} />

      <TasksList
        tasks={tasks}
        toggleTaskDone={handleToggleTaskDone}
        removeTask={handleRemoveTask}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EBEBEB'
  }
})