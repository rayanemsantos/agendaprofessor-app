import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Container from "../../components/container";
import { Subtitle, Title } from "../../components/text";
import SelectList from 'react-native-dropdown-select-list'
import { StyleSheet, View, Dimensions, ScrollView, Text, TouchableOpacity, Platform, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, Image } from 'react-native';
import { URL_BASE } from '../../providers/config';
import { CustomButtonContained } from "../../components/customButton";

import { getToken, getUserData } from "../../storage/Storage"

export default function FrequenciaPage(props) {
    const [schoolClassSubjectList, setSchoolClassSubjectList] = useState([]);
    const [schoolClassSubjectSelected, setSchoolClassSubjectSelected] = useState('');
    const [schoolClassSubject, setSchoolClassSubject] = useState('');

    useEffect(() => {
        const getClasses = async () => {
            const userToken = await getToken()
            const userData = await getUserData()
            console.log(`Bearer ${JSON.parse(userToken)}`)

            const response = await fetch("https://agenda-professor-api.herokuapp.com/api/school_class_subject", {
                method: 'GET',
                headers: new Headers({
                    'Authorization': `Bearer ${JSON.parse(userToken)}`
                })
            }).then(function (response) {
                return response.json()
            })

            const { id: teacherId } = JSON.parse(userData)

            const filtered = response.filter((item) => item.teacher == teacherId)
            setSchoolClassSubject(filtered)

            const listSelect = filtered.map(item => ({ key: item.id, value: item.school_class.serie + " " + item.school_class.identification + " | " + item.subject + " | " + item.school_class.shift }))

            setSchoolClassSubjectList(listSelect)

        }

        getClasses()
    }, [])

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
                                <SelectList setSelected={setSchoolClassSubjectSelected} data={schoolClassSubjectList}  />

                            </View>
                            <View style={styles.formContainer}>
                                <CustomButtonContained
                                    text='Avançar'
                                    // onPress={showStudents}
                                    onPress={() => props.navigation.navigate('Lançar Frequencia', {
                                        id: 200
                                    })}
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
        marginTop: 40
    },
    formContainer: {
        marginTop: 20
    },
});