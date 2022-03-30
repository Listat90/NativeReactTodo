import React, {useState} from 'react'
import { View, StyleSheet, TextInput, Modal, Alert } from 'react-native'
import { THEME } from '../theme'
import {MaterialIcons, AntDesign} from '@expo/vector-icons'
import { AppButton } from './ui/AppButton'

export const EditModal = ({visible, onCancel, value, onSave})=> {

    const [title, setTitle] = useState(value)

    const saveHandler = () => {
        if(title.trim().length < 3){
            Alert.alert('Ошибка', `минимальная длинна названия 3 символа. Сейчас ${title.trim().length} символов`)
        }else {
            onSave(title)
        }
    }

    return (
        <Modal visible={visible} animationType='slide' transparent ={false}>
            <View style={styles.wrap}>
                <TextInput
                    value={title}
                    onChangeText={setTitle}
                    style={styles.input}
                    placeholder='Введите название'
                    autoCapitalize='none'
                    autoCorrect={false}
                    maxLength={64}
                    />
                <View style={styles.buttons}>
                    <AppButton onPress={onCancel} color={THEME.DANGER_COLOR}>
                    <MaterialIcons name="cancel" size={24} color="#fff" />
                    </AppButton>

                    <AppButton onPress={saveHandler}>
                    <AntDesign name="save" size={24} color="#fff" />
                        </AppButton>
                </View>
               
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    wrap: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',

    }, 
    input: {
        padding: 10,
        borderBottomColor: THEME.MAIN_COLOR,
        borderBottomWidth: 2,
        width: '80%',
    },
    buttons: {
        width:'100%',
        marginTop: 10,
        flexDirection: 'row',
        justifyContent: 'space-around',
    }
})  
