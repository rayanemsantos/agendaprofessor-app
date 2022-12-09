import React from 'react';
import { Text, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import { shadow, primary, fontBold } from '../assets/colors';

const styles = StyleSheet.create({
    buttonOutlined: (disabled) => ({
        paddingLeft:16,
        paddingRight:16,
        height: 44,
        display:'flex',
        justifyContent: 'center',
        alignItems:'center',
        borderRadius: 8,
        backgroundColor:'white',
        borderWidth: 2,
        borderColor: primary,
        color: primary,
        opacity: disabled ? 0.5 : 1,
        ...shadow,
    }),
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
        fontFamily: fontBold,
        textTransform: 'uppercase'
    },    
});

export const CustomButtonOutlined = ({ ...props }) => (
    <TouchableOpacity {...props} style={[styles.buttonOutlined(props.disabled), {...props.style}]}>
        <Text style={styles.textPrimary}>
            {props.text}
        </Text>
    </TouchableOpacity>    
);

export const CustomButtonContained = ({ text='', loading = false, ...props }) => (
    <TouchableOpacity {...props} style={[styles.buttonContained(props.disabled), {borderRadius: props.bordered == false ?  0 : 8}, {...props.style}]}>
        <Text style={styles.text}>{
            loading ? (
                <ActivityIndicator/>
            ) : (
                text
            )
        }
        </Text>
    </TouchableOpacity>    
);