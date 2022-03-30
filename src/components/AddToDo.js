import React, {useState} from 'react';
import { View, StyleSheet, TextInput, Button, Alert, Keyboard} from  'react-native'
import { THEME } from '../theme';
import { AntDesign } from '@expo/vector-icons'



export const AddToDo = ({onSubmit})=> {

    const[value, setValue] = useState('');

    const pressHandler = () => {

        if(value.trim()){
            onSubmit(value)
            setValue('')
            Keyboard.dismiss() 
        }else{
            Alert.alert('Название не может быть пустым пёс')
        }
        
    }
    return (
        <View style= {styles.block}>
            <TextInput style ={styles.input}
            onChangeText={text=> setValue(text)}
            value={value}
            placeholder="Введите название дела"
            autoCorrect={false}
            autoCapitalize = "none"
           
            />
            <AntDesign.Button onPress={pressHandler} name="pluscircleo">
                Добавить
            </AntDesign.Button>
            {/* <Button title='Добавить' onPress={pressHandler} /> */}
            
           

        </View>
    )
}

const styles = StyleSheet.create({
    block: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 15,
        
    },
    input: {
        width: '60%',
        borderStyle: 'solid',
        borderBottomWidth: 2,
        borderBottomColor: THEME.MAIN_COLOR,
        padding: 10,
       
        

    }
})