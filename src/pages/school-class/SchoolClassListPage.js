import React, {useEffect, useState} from 'react';
import { View, StyleSheet, ScrollView, FlatList, ActivityIndicator } from 'react-native';
import Container from '../../components/container';
import { H3, Span, Subtitle, Title } from '../../components/text';
import { fetchSchoolClassSubjects } from '../../providers/SchoolClassProvider';
import { CustomButtonContained } from '../../components/customButton';
import dateUtil from '../../utils/dateUtil';
import { useIsFocused } from '@react-navigation/core';
import { primary } from '../../assets/colors';
import { Icon } from 'react-native-elements';

export default function SchoolClassListPage(props) {
    const { navigation } = props;
    
    const isFocused = useIsFocused();
    const [list, setList] = useState([]);
    const [loading, setLoading] = useState(false);
    
    const formatDate = dateUtil.formatDate;


    useEffect(() => {
        const getSchoolClassSubjects = async () => {
            setLoading(true);
            try {
                const response  = await fetchSchoolClassSubjects();
                setList(response);
            } catch (error) {
                console.log('err', error.response)
            } finally {
                setLoading(false);
            }
        }

        getSchoolClassSubjects();
    }, [isFocused]);


    const renderItem = ({ item }) => (
        <View style={styles.card}>
            <Title style={{fontSize: 12}} text={`${item.school_class.shift}`}/>
            <H3 style={{marginTop: 0}} text={`${item.school_class.serie} ano ${item.school_class.identification}`}/>
            <View style={{display: 'flex', flexDirection: 'row'}}>
                <Icon
                    name='people-outline'
                    type='material'
                    size={24}
                    color={primary}
                    style={{paddingRight: 5}}
                /> 
                <Span text={`${item.students_subject.length} alunos `}/>
            </View>
            <View>
            <CustomButtonContained
                text='Ver alunos'
                style={{marginBottom: 5, marginTop: 12}}
                onPress={() => goToStudents(item)}
            />                
            </View>
        </View>
    );

    function goToStudents(school_class){
        navigation.navigate('StudentListPage', {
            students: school_class.students_subject
        })
    }

    return (
        <Container>
            <ScrollView>
                <View style={styles.listContainer}>
                {
                  loading ? (
                    <ActivityIndicator size="large"/>
                  )  : (
                    <FlatList
                        data={list}
                        renderItem={renderItem}
                        keyExtractor={item => item.id}
                        ListEmptyComponent={
                            <View>
                                <Subtitle text='Nenhuma turma a ser listada.'/>
                            </View>                        
                        }
                    />
                  )
                }                    
                </View>
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
        borderWidth: 2,
        borderColor: primary,
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