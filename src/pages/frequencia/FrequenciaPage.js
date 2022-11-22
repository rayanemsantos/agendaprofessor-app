import React, { useEffect, useState } from 'react';
import Container from "../../components/container";
import { Subtitle } from "../../components/text";
import SelectList from 'react-native-dropdown-select-list'
import { StyleSheet, View, Text, ScrollView, Button, Platform, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { fetchSchoolClassSubjects } from '../../providers/SchoolClassProvider';
import { CustomButtonContained } from '../../components/customButton';
import { Title } from "../../components/text";
import DateTimePicker from '@react-native-community/datetimepicker';


export default function FrequenciaPage(props) {
    const [schoolClassSubjectList, setSchoolClassSubjectList] = useState([]);
    const [schoolClassSubjectSelected, setSchoolClassSubjectSelected] = useState('');
    const [schoolClassSubject, setSchoolClassSubject] = useState('');
    const [isPickerShow, setIsPickerShow] = useState(false);
    const [date, setDate] = useState(new Date(Date.now()));

    const showPicker = () => {
        setIsPickerShow(true);
    };
    
    const onChange = (event, value) => {
    setDate(value);
    if (Platform.OS === 'android') {
      setIsPickerShow(false);
    }
    };

    useEffect(() => {
        const getClasses = async () => {
            try {
                const response = await fetchSchoolClassSubjects();
                setSchoolClassSubject(response);
                let listSelect = response.map(item => ({ key: item.id, value: item.school_class.serie + " " + item.school_class.identification + " | " + item.subject + " | " + item.school_class.shift }))
                setSchoolClassSubjectList(listSelect);
            } catch (error) {
                console.log('err', error)
            }
        }

        getClasses();
    }, []);

    const showStudents = () => {
        // vai exibir os estudantes de school class subject 
        // const [ students_subject ] = schoolClassSubjectList[schoolClassSubject]
        const obj = schoolClassSubject.filter(item => item.id == schoolClassSubjectSelected)

        if (obj.length) {
            const [list] = obj
            const {students_subject} = list
            if (students_subject.length > 0) {
                const { class_subject } = students_subject[0]
                props.navigation.navigate('Lançar Frequencia', { classSubjectId: class_subject, listStudents: students_subject, date })
            }
        }
    }

    return (
        <Container>
            <ScrollView>
                <KeyboardAvoidingView behavior={Platform.OS == "ios" ? "padding" : "height"} keyboardVerticalOffset={-550}>
                    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                        <Container>
                            <View style={styles.formTitleContainer}>
                                <Title text='Disciplina'/>
                                <SelectList setSelected={setSchoolClassSubjectSelected} data={schoolClassSubjectList} />
                            </View>
                            
                            <View style={styles.formTitleContainer}>
                                {/* Display the selected date */}
                                <View style={styles.pickedDateContainer}>
                                <Text onPress={showPicker} style={styles.pickedDate}>{date.toUTCString() }</Text>
                            </View>
                                {/* The date picker */}
                                {isPickerShow && (
                                    <DateTimePicker
                                    value={date}
                                    dateFormat={'DD/MM/YYYY'}
                                    mode={'date'}
                                    display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                                    is24Hour={true}
                                    onChange={onChange}
                                    style={styles.datePicker}
                                />)}
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
        width: 320,
        height: 260,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-start',
      },
    });