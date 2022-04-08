import React, { useReducer, useContext } from 'react'
import { Alert} from 'react-native'
import { TodoContext } from './todoContext'
import { todoReducer } from './todoReducer'
import { ADD_TODO, REMOVE_TODO, UPDATE_TODO } from '../types'
import { ScreenContext } from '../screen/screenContext'
import { SHOW_LOADER } from '../types'
import { HIDE_LOADER } from '../types'
import { CLEAR_ERROR } from '../types'
import { SHOW_ERROR } from '../types'
import { FETCH_TODOS } from '../types'
import { Http } from '../../http'

export const TodoState = ({ children }) => {
  const initialState = {
    todos: [], 
    loading: false,
    error: null
  }

  const {changeScreen} = useContext(ScreenContext)
  const [state, dispatch] = useReducer(todoReducer, initialState)




  const addTodo = async title => {
    clearError()

    try{
      const data = await Http.post(
        'https://rn-todo-app-cb2e5-default-rtdb.firebaseio.com/todos.json',
         { title }
      )
      dispatch({ type: ADD_TODO, title, id: data.name })
    }catch{
      showError('Не работает (')
    }
  }




  const removeTodo = id =>{

  

    const todo = state.todos.find(t => t.id === id)

    Alert.alert(
          'Удаление элемента',
          `Вы уверены, что хотите удалить "${todo.title}"?`,
          [
            {
              text: 'Отмена',
              style: 'cancel'
            },
            {
              text: 'Удалить',
              style: 'destructive',
              onPress: async () => {
                changeScreen(null)
                await Http.delete(`https://rn-todo-app-cb2e5-default-rtdb.firebaseio.com/todos/${id}.json`)
                dispatch({ type: REMOVE_TODO, id })
              }
            }
          
          ],
          { cancelable: false }
        )
        }


  
  const fetchTodos = async() => {
    showLoader()
    clearError()
    try {
      const data = await Http.get('https://rn-todo-app-cb2e5-default-rtdb.firebaseio.com/todos.json')
      
      const todos = Object.keys(data).map(key => ({ ...data[key], id: key }))
      
    
     setTimeout(()=> {
      dispatch({type: FETCH_TODOS, todos})
     }, 5000)
      
  
    

    } catch (e) {
      showError('Что то пошло не так...')
      console.log(e)
    }
    finally {
      hideLoader()
    }
 


    
  }   
  
  
  const updateTodo = async(id, title) => {
    clearError()

    try {
     

    await Http.patch(
      `https://rn-todo-app-cb2e5-default-rtdb.firebaseio.com/todos/${id}.json`
      )
    dispatch({ type: UPDATE_TODO, id, title })
    } catch(e) {
      showError('Что то пошло не так...')
      console.log(e)
    }
  }


  const showLoader = () => dispatch({type: SHOW_LOADER})

  const hideLoader = () => dispatch({type: HIDE_LOADER})

  const showError = error => dispatch({type: SHOW_ERROR, error})

  const clearError = () => dispatch({tepe:CLEAR_ERROR})
  return (
    <TodoContext.Provider

   
   
      value={{
        todos: state.todos,
        loading: state.loading,
        error: state.error,
        addTodo,
        removeTodo,
        updateTodo,
        fetchTodos
      }}
    >
      {children}
    </TodoContext.Provider>
  )
}
