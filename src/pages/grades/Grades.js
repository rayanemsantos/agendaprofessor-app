import React, { useState} from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import SelectList from 'react-native-dropdown-select-list';

import { H3 } from '../../components/text';
import { CustomButtonContained } from '../../components/customButton';
import Container from '../../components/container';
import SchoolClassSelect from '../school-class/components/SchoolClassSelect';

export default function GradesPage(props) {
    const PERIODS = [
        '1 Bimestre',
        '2 Bimestre',
        '3 Bimestre',
        '4 Bimestre', 
    ]
    const { navigation } = props;
    const [selectedClass, setSelectedClass] = useState(null);
    const [period, setPeriod] = useState(null);

    const handleClasses = (item) => {
        setSelectedClass(item);
    };

    function goToGradeUpdate(){
        navigation.navigate('GradeUpdatePage', {
            classSubject: selectedClass,
            listStudents: selectedClass.students_subject, 
            period: period
        })
    }
    
    return (
        <Container>
            <ScrollView>
                <H3 text='Selecione uma turma'/>
                <SchoolClassSelect callbackSelect={handleClasses}/>

                <H3 text='Selecione um período'/>
                <SelectList 
                    setSelected={setPeriod}
                    data={PERIODS.map(item => ({ key: item, value: item }))} 
                    placeholder='Selecione'
                    search={false}
                />

                <CustomButtonContained
                    style={{marginTop: 16}}
                    text='Avançar'
                    onPress={goToGradeUpdate}
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