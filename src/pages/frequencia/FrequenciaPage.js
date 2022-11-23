import React, { useState } from 'react';
import Container from "../../components/container";
import { StyleSheet, View, ScrollView,  Platform, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { CustomButtonContained } from '../../components/customButton';
import { Subtitle, Title, H3 } from "../../components/text";
import SchoolClassSelect from '../school-class/components/SchoolClassSelect';
import RNDateTimePicker from '@react-native-community/datetimepicker';


export default function FrequenciaPage(props) {
    const [schoolClassSubjectSelected, setSchoolClassSubjectSelected] = useState('');
    const [date, setDate] = useState(null);
    
    const onChange = (event, value) => {
        setDate(value);
    };

    const showStudents = () => {
        console.log(schoolClassSubjectSelected.students_subject)
        props.navigation.navigate('Lançar Frequencia', { 
            classSubjectId: schoolClassSubjectSelected.id, 
            listStudents: schoolClassSubjectSelected.students_subject, 
            date 
        })
    };

    return (
        <Container>
            <ScrollView>
                <KeyboardAvoidingView behavior={Platform.OS == "ios" ? "padding" : "height"} keyboardVerticalOffset={-550}>
                    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                        <Container>
                            <H3 text='Selecione a turma'/>
                            <SchoolClassSelect callbackSelect={setSchoolClassSubjectSelected}/>

                            <H3 text='Selecione a data'/>
                            <View style={styles.formTitleContainer}>
                                <RNDateTimePicker
                                    value={date || new Date()}
                                    dateFormat={'DD/MM/YYYY'}
                                    mode='date'
                                    display='inline'
                                    is24Hour={true}
                                    onChange={onChange}
                                    style={styles.datePicker}
                                    maximumDate={new Date()}
                                />
                            </View>
                            <View style={styles.formContainer}>
                                <CustomButtonContained
                                    text='Avançar'
                                    onPress={showStudents}
                                    disabled={schoolClassSubjectSelected === ''}
                                />
                            </View>
                        </Container>
                    </TouchableWithoutFeedback>
                </KeyboardAvoidingView>
            </ScrollView>
        </Container>
    )
}
const styles = StyleSheet.create({
    formTitleContainer: {
        marginTop: 10
    },
    formContainer: {
        marginTop: 20
    },container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        flex: 1,
        justifyContent: 'center',
        padding: 50,
      },
      pickedDateContainer: {
        padding: 15,
        backgroundColor: '#ffffff',
        borderRadius: 10,
      },
      pickedDate: {
        fontSize: 18,
        color: 'black',
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