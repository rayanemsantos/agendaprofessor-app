import React from 'react';
import { Text, StyleSheet, TouchableOpacity } from 'react-native';
import { shadow, primary, fontBold } from '../assets/colors';

const styles = StyleSheet.create({
    buttonOutlined:{
        ...shadow,
        marginTop:16,
        height: 44,
        display:'flex',
        justifyContent: 'center',
        alignItems:'center',
        borderRadius: 24,
        borderWidth:2,
        borderColor:primary,
        backgroundColor:'white'
    },
    buttonContained: (disabled) => ({
        paddingLeft:16,
        paddingRight:16,
        height: 44,
        display:'flex',
        justifyContent: 'center',
        alignItems:'center',
        borderRadius: 8,
        backgroundColor:primary,
        opacity: disabled ? 0.5 : 1,
        ...shadow,
    }),
    text: {
        color: 'white',
        fontFamily: fontBold,
        textTransform: 'uppercase'
    },
    textPrimary: {
        color: primary, 
        fontSize: 14,
        fontFamily: fontBold
    },    
});

export const CustomButtonOutlined = ({ ...props }) => (
    <TouchableOpacity {...props} style={[styles.buttonOutlined, {...props.style}]}>
        <Text style={styles.textPrimary}>{props.text}</Text>
    </TouchableOpacity>    
);

export const CustomButtonContained = ({ text='', ...props }) => (
    <TouchableOpacity {...props} style={[styles.buttonContained(props.disabled), {borderRadius: props.bordered == false ?  0 : 8}, {...props.style}]}>
        <Text style={styles.text}>{text}</Text>
    </TouchableOpacity>    
);