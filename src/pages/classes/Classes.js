import React, {useEffect, useState} from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import Container from '../../components/container';
import { H3 } from '../../components/text';
import SchoolClassSelect from '../school-class/components/SchoolClassSelect';
import { CustomButtonContained, CustomButtonOutlined } from '../../components/customButton';
import { useIsFocused } from '@react-navigation/core';
import RNDateTimePicker from '@react-native-community/datetimepicker';

export default function ClassesPage(props) {
    const { navigation } = props;

    const [date, setDate] = useState(new Date());
    const [selectedClass, setSelectedClass] = useState(null);


    const onChange = (event, value) => {
        setDate(value);
    };

    const handleClasses = (item) => {
        setSelectedClass(item);
    };

    function goToClassesForm(){
        navigation.navigate('ClassesFormPage', {
            class_subject: selectedClass,
            date: date
        })
    }

    function goToClassesHistory(){
        navigation.navigate('ClassesHistoryPage', {
            classSubject: selectedClass
        })
    }
    
    return (
        <Container>
            <ScrollView>

                <H3 text='Selecione uma turma'/>
                <SchoolClassSelect callbackSelect={handleClasses}/>

                <H3 text='Selecione a data'/>
                <View style={styles.formTitleContainer}>
                    <RNDateTimePicker
                        value={date}
                        dateFormat={'DD/MM/YYYY'}
                        mode='date'
                        display='inline'
                        is24Hour={true}
                        onChange={onChange}
                        style={styles.datePicker}
                        maximumDate={new Date()}
                    />
                </View>

                <CustomButtonContained
                    style={{marginTop: 16}}
                    text='Registrar nova aula'
                    onPress={goToClassesForm}
                    disabled={!selectedClass}
                />
                <CustomButtonOutlined
                    style={{marginTop: 16}}
                    text='Ver histórico'
                    onPress={goToClassesHistory}
                    disabled={!selectedClass}
                />                
            </ScrollView>
        </Container>
    );
}
const styles = StyleSheet.create({
    listContainer: {
        marginTop: 16
    },
    card: {
        marginBottom: 8,
        borderWidth: 1,
        borderColor: 'rgba(0,0,0,0.5)',
        borderRadius: 8,
        padding: 16
    },
    // This only works on iOS
    datePicker: {
        width: '100%',
        height: 260,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-start',
        borderWidth: 1,
        borderRadius: 8,
        borderColor: 'rgba(0,0,0,0.5)'
    },
});