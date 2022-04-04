import React, { useState, useEffect, useContext } from 'react'
import { StyleSheet, View, FlatList , Image, Dimensions} from 'react-native'
import { AddToDo } from '../components/AddToDo';
import { Todo } from '../components/Todo'
import { THEME } from '../theme';
import { ScreenContext } from '../context/screen/screenContext';
import { TodoContext } from '../context/todo/todoContext';

export const MainScreen = () => {

    const {addTodo, todos, removeTodo} = useContext(TodoContext)
    const {changeScreen} = useContext(ScreenContext)
    

    const [deviceWidth, setDeviceWidth] = useState(
        Dimensions.get('window').width - THEME.PADDING_HORIZONTAL * 2)

    
    useEffect(()=>  {
        const update= ()=>{
            const width= Dimensions.get('window').width - THEME.PADDING_HORIZONTAL * 2
            setDeviceWidth(width)
        }
        Dimensions.addEventListener('change', update)

        return () => {
            Dimensions.removeEventListener('change', update)
        }
        
    })

    
    let content = ( 
       <View style={{width: deviceWidth}}>
            <FlatList
            keyExtractor={item => item.id.toString()}
            data={todos}
            renderItem={({item})=>(
                <Todo todo= {item} onRemove = {removeTodo} onOpen={changeScreen} />
            )}
        />
       </View>
    )

        if (todos.length === 0) {
            content = (
            <View style={styles.imgWrap}>
                <Image
                 style={styles.image}
                  source={require('../../assets/no-items.png')}
                />
                
            </View>
            )
            
        }
    return(

        <View>
            <AddToDo onSubmit={addTodo}/>
            {content}
           
        </View>
    )
}

const styles = StyleSheet.create({

    imgWrap: {
        alignItems:'center',
        padding: 10,
        justifyContent: 'center',
        height: 300,

    },
    image: {
        width: '100%',
        height: '100%',
        resizeMode: 'contain'
    }
})