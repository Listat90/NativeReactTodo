
import React, { useState } from 'react'
import { StyleSheet, View, Alert } from 'react-native'
import * as Font from 'expo-font'
import AppLoading from 'expo-app-loading';

import { Navbar } from './src/components/Navbar';
import { MainScreem } from './src/screens/MainScreem';
import { TodoScreen } from './src/screens/TodoScreen';
import { THEME } from './src/theme';



async function loadApplication() {
  await Font.loadAsync({
    'roboto-regular': require('./assets/fonts/Roboto-Regular.ttf'),
    'roboto-bold': require('./assets/fonts/Roboto-Bold.ttf')
  })
}

export default function App() {

  const [isReady, setIsReady] = useState(false)
  const [todoId, setTodoId] = useState(null)
  const [todos, setTodos] = useState([
      {id: '1', title: 'Выучить React Natie'}
      

  ]);

  if (!isReady) {
    return (
      <AppLoading
        startAsync={loadApplication}
        onError={err => console.log(err)}
        onFinish ={()=>setIsReady(true)}
      />
    )
  }
  
  const addTodo = (title) => {
    const newTodo = {
      id: Date.now().toString(),
      title: title
    }
  

    setTodos(prev => [
      ...prev,
       {
      id: Date.now().toString(),
      title
    }
  ])
  }

  const updateTodo = (id, title) => {
    setTodos(old => old.map(todo=>{
      if(todo.id === id){
        todo.title = title
      }
      return todo
    }))
  }

  const removeTodo = id => {
    const todo = todos.find(t => t.id === id)
    Alert.alert(
      "Удаление элемента",
        `Вы уверенны что хотите удалить, "${todo.title}"?`,
      [
        {
          text: "Отмена",
          
          style: "cancel"
        },
        { text: "Удалить",
          styles: 'destructive',
          onPress: () => {
            setTodoId(null);
            setTodos(prev => prev.filter(todo => todo.id !== id))
        } 
      }
      ]
    );

    
  }

  let content = (
    <MainScreem
     todos={todos}
      addTodo={addTodo}
       removeTodo={removeTodo}
        openTodo={setTodoId}
    />  
  )
 
  if (todoId){
    const selectedTodo = todos.find(todo => todo.id === todoId)
    content = <TodoScreen
              onRemove ={removeTodo}
              goBack={() => setTodoId(null)}
              todo ={selectedTodo}
              onSave ={updateTodo}
              />
  }

  return (
    <View>
     
      <Navbar title="Todo App Gorillaz!"/>
      <View style={styles.container}>
        {content}
       
      </View>
      

    </View>
  );
}

const styles = StyleSheet.create ({
  container: {
    paddingHorizontal: THEME.PADDING_HORIZONTAL,
    paddingVertical: 20,
  }
});
