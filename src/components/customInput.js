import React, {useEffect} from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { shadow, fontBold } from '../assets/colors';
import { Icon } from 'react-native-elements';
import MaskInput, {createNumberMask} from 'react-native-mask-input';
import CurrencyInput from 'react-native-currency-input';

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
    formInputMultiline: {
        ...shadow,
        fontFamily: fontBold,
        backgroundColor: '#F8F8F8',
        color: '#000',
        paddingLeft: 16,
        borderRadius: 8,
        marginBottom: 16,
        height: 120,
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
        color:'#000', 
        opacity:0.6
    },
    formInputSearch:{
        ...shadow,
        // height:44,
        // backgroundColor: '#fff',
        // color: '#000',
        // marginBottom: 12,
        textAlignVertical:'center',     
        flexDirection: 'row',
        alignItems: 'center',
        // justifyContent: 'flex-start',   
        // paddingHorizontal: 16,
        // borderRadius: 24,
        fontFamily: fontBold,
        backgroundColor: '#F8F8F8',
        color: '#000',
        paddingLeft: 16,
        borderRadius: 8,
        marginBottom: 16,
        textAlignVertical:'center',
        height: 55,        
    }
});

const MASKS = {
    phone: [
      '(',
      /\d/,
      /\d/,
      ')',
      ' ',
      /\d/,
      /\d/,
      /\d/,
      /\d/,
      /\d/,
      '-',
      /\d/,
      /\d/,
      /\d/,
      /\d/,
    ],
    cpf: [
      /\d/,
      /\d/,
      /\d/,
      '.',
      /\d/,
      /\d/,
      /\d/,
      '.',
      /\d/,
      /\d/,
      /\d/,
      '-',
      /\d/,
      /\d/,
    ],
    cnpj: [
      /\d/,
      /\d/,
      '.',
      /\d/,
      /\d/,
      /\d/,
      '.',
      /\d/,
      /\d/,
      /\d/,
      '/',
      /\d/,
      /\d/,
      /\d/,
      /\d/,
      '-',
      /\d/,
      /\d/,
    ],
    kg: [kgMask, 'kg'],
  };
  
  const kgMask = createNumberMask({
    separator: ',',
    precision: 1,
  });

  export const MaskInputText = ({mask = 'phone', ...props}) => (
    <MaskInput {...props} mask={MASKS[mask]} />
  );

  function MaskInputCurrency({value, onChangeText, suffix, ...props}) {
    const [currentValue, setValue] = React.useState(value);
  
    function handleChange(targetValue) {
      setValue(targetValue);
      onChangeText(targetValue);
    }
  
    useEffect(() => {
      setValue(value);
    }, [value]);
  
    return (
      <CurrencyInput
        value={currentValue}
        onChangeValue={handleChange}
        suffix={suffix}
        delimiter="."
        separator="."
        precision={1}
        minValue={0}
        maxValue={10}
        onChangeText={(formattedValue) => {
          console.log(formattedValue); // R$ +2.310,46
        }}
        {...props}
      />
    );
  }

export const AppInput = ({ mask = false, ...props }) => (
    <View style={{ flex: 1}}>
        {props.label && <Text style={styles.formInputLabel}>{props.label}</Text>}

        {
            mask ? (
            <MaskInputCurrency
                style={[{backgroundColor:props.backgroundColor}, styles.formInput]}
                onChangeText={(masked) => {
                    props.onChangeText(masked);
                }}        
                {...props}
            />             
            ) : (
                <TextInput style={[{backgroundColor:props.backgroundColor}, styles.formInput]} {...props} />
            )
        }
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
        {props.label && <Text style={styles.formInputLabel}>{props.label}</Text>}
        <TextInput style={[styles.formInputMultiline]} {...props} />
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

export const IconInput = ({ value='', ...props }) => (
    <TouchableOpacity {...props} style={styles.formInputSearch}>
        <Icon
            name='calendar'
            type='font-awesome'
            size={18}
            style={styles.searchIcon}
        />
        <Text style={{color:'#000', opacity:0.7}}>{value ? value : 'Selecionar data'}</Text>
    </TouchableOpacity>
);