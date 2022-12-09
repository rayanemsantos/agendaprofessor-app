import React  from 'react';
import { View, StyleSheet, ScrollView, FlatList, ActivityIndicator } from 'react-native';
import Container from '../../components/container';
import { H3, Span, Subtitle, Title } from '../../components/text';
import { primary } from '../../assets/colors';
import { Icon } from 'react-native-elements';

export default function StudentListPage(props) {
    const { route } = props;
    const { params } = route;
    const { students } = params;
    

    const renderItem = ({ item }) => (
        <View style={styles.card}>
            <View style={{display: 'flex', flexDirection: 'row', marginTop: 12}}>
                <Icon
                    name='face'
                    type='material'
                    size={24}
                    color={primary}
                    style={{paddingRight: 5}}
                />             
                <H3  style={{marginTop: 0}} text={`${item.student.full_name}`}/>
            </View>
            <Title style={{fontSize: 12}} text='Matrícula'/>
            <Span text={item.student.registration_id}/>

            <Title style={{fontSize: 12}} text='Responsável'/>
            <Span text={item.student.responsible_name}/>
            <Span text={item.student.responsible_contact}/>   

            <Title style={{fontSize: 12}} text='Notas'/>        
            {
                item.average_grade.map((_ag) => {
                    return (
                        <Span text={`${_ag.period}: ${_ag.average_grade}`}/>   
                    )
                })
            }
        </View>
    );

    return (

        <Container>
            <ScrollView>
                <View style={styles.listContainer}>
                <FlatList
                    data={students}
                    renderItem={renderItem}
                    keyExtractor={item => item.id}
                    ListEmptyComponent={
                        <View>
                            <Subtitle text='Nenhum aluno(a) a ser listado(a).'/>
                        </View>                        
                    }
                />                  
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