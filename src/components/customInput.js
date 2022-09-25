import React from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { shadow, fontBold } from '../assets/colors';


const styles = StyleSheet.create({
    formInput: {
        ...shadow,
        fontFamily: fontBold,
        backgroundColor: '#F8F8F8',
        color: '#000',
        paddingLeft: 16,
        borderRadius: 8,
        marginBottom: 16,
        textAlignVertical:'center',
        height: 55,
    },
    formInputLabel: {
        fontFamily: fontBold,
        color:'#343434', 
        paddingBottom: 10,
    },
    formInputSelect: {
        ...shadow,
        height:55,
        backgroundColor: '#fff',
        color: '#000',
        marginBottom: 12,
        textAlignVertical:'center',     
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',   
        paddingHorizontal: 16,
        borderRadius: 24,
    }, 
    searchSection: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    searchIcon: {
        padding: 10,
        color:'#343434', 
        opacity:0.6
    },
    formInputSearch:{
        ...shadow,
        height:44,
        backgroundColor: '#fff',
        color: '#000',
        marginBottom: 12,
        textAlignVertical:'center',     
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',   
        paddingHorizontal: 16,
        borderRadius: 24,
    }
});

export const AppInput = ({ ...props }) => (
    <View style={{ flex: 1}}>
        {props.label && <Text style={styles.formInputLabel}>{props.label}</Text>}
        <TextInput style={[{backgroundColor:props.backgroundColor}, styles.formInput]} {...props} />
    </View>
);

export const SearchInput = ({ ...props }) => (
    <TouchableOpacity {...props} style={styles.formInputSearch}>
        {/* {props.icon && 
            <Icon
            name='search'
            type='font-awesome'
            size={18}
            style={styles.searchIcon}
            />
        } */}
        <Text style={{color:'#343434', opacity:0.7}}>Pesquisar</Text>
    </TouchableOpacity>
);


export const AppInputMultiline = ({ ...props }) => (
    <View style={{ flex: 1}}>
        {props.label !== '' && <Text style={{color:'#343434', paddingBottom: 10}}>{props.label}</Text>}
        <TextInput style={[styles.formInput, {height: props.multiline ? 120 : 55}, {paddingTop: props.multiline ? 16 : 0}, ]} {...props} />
    </View>
);

export const AppInputSelect = ({ ...props }) => (
    <>
    {props.label !== '' && <Text style={{color:'#343434', marginBottom:12}}>{props.label}</Text>}
    <TouchableOpacity {...props} style={[styles.formInputSelect]}>
        {props.value ? 
            (
                <Text style={{color:'#000'}}>{props.value ? props.value : props.placeholder}</Text>
            ) :(
                <Text style={{color:'#343434', opacity:0.7}}>{props.value ? props.value : props.placeholder}</Text>
            )
        }
        {/* <Icon
            name='arrow-down'
            type='font-awesome'
            color={colors.brown}
            size={16}
        />         */}
    </TouchableOpacity>
    </>
);