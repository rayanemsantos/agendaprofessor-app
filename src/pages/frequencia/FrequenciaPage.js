import React, { useEffect, useState } from 'react';
import Container from "../../components/container";
import { Subtitle } from "../../components/text";
import SelectList from 'react-native-dropdown-select-list'
import { StyleSheet, View, ScrollView, Platform, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { fetchSchoolClassSubjects } from '../../providers/SchoolClassProvider';

export default function FrequenciaPage() {
    const [schoolClassSubjectList, setSchoolClassSubjectList ] = useState([]);
    const [schoolClassSubjectSelected, setSchoolClassSubjectSelected] = useState('');
    const [schoolClassSubject, setSchoolClassSubject] = useState('');

    useEffect(() => {
        const getClasses = async () => {
            try {
                const response  = await fetchSchoolClassSubjects();
                setSchoolClassSubject(response);
                let listSelect = response.map(item => ({ key: item.id, value: item.school_class.label }))
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
            // const [students_subject] = obj[0]
            console.log(obj[0].students_subject)
        }
    }

    return (
        <Container>
            <ScrollView>
                <KeyboardAvoidingView behavior={Platform.OS == "ios" ? "padding" : "height"} keyboardVerticalOffset={-550}>
                    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                        <Container>
                            <View style={styles.formTitleContainer}>
                                <Subtitle style={styles.formTitleConta} text='Turma' />
                                <SelectList setSelected={setSchoolClassSubjectSelected} data={schoolClassSubjectList} onSelect={() => showStudents()} />
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
    formTitleConta: {
        marginTop: 20,
        marginBottom: 2,
    }
});