import React from  'react';
import {View, StyleSheet, Platform} from 'react-native';
import { THEME } from '../theme';
import { AppTextBold } from './ui/AppTextBold';

export const Navbar = (props) => {
    return (
        <View style = {{
            ...styles.navbar,
            ...Platform.select({
            ios: styles.navbarIos,
            android:styles.navbarAndroid
        })
        }}>
            <AppTextBold style = {styles.text}>
                {props.title}
            </AppTextBold>
        </View>
    )
}

const styles = StyleSheet.create({

    navbar: {
        height: 70,
        alignItems: 'center',
        justifyContent: 'flex-end',
        
        paddingBottom: 10 

    },

    navbarAndroid: {
        backgroundColor: THEME.MAIN_COLOR,
    },

    navbarIos: {
        borderBottomColor: THEME,
        borderBottomWidth: 1,
    },
    text: {
        color: Platform.OS === 'ios' ? THEME.MAIN_COLOR: '#fff',
        fontSize: 20,

    }
})