import React, {useEffect, useState} from 'react';
import { View, StyleSheet, TouchableOpacity, ScrollView, FlatList, ActivityIndicator } from 'react-native';
import Container from '../../components/container';
import { H3, Span, Subtitle, Title, Body } from '../../components/text';
import SchoolClassSelect from '../school-class/components/SchoolClassSelect';
import { fetchClassSubjectsHistory } from '../../providers/SchoolClassProvider';
import { CustomButtonContained } from '../../components/customButton';
import dateUtil from '../../utils/dateUtil';
import { useIsFocused } from '@react-navigation/core';
import RNDateTimePicker from '@react-native-community/datetimepicker';

export default function ClassesPage(props) {
    const { route } = props;
    const { params } = route;
    const { classSubject } = params;
    
    const isFocused = useIsFocused();

    const [history, setHistory] = useState([]);
    const [loading, setLoading] = useState(false);
    
    const formatDate = dateUtil.formatDate;

    useEffect(()=>{
        handleClasses(classSubject.id);
    }, [isFocused, classSubject]);

    const handleClasses = (class_subject_id) => {
        setLoading(true);
        fetchClassSubjectsHistory({
            class_subject: class_subject_id
        }).then((data) => {
            setHistory(data);
        }).catch((err) => {
            console.log('err', err)
        }).finally(() => {
            setLoading(false);
        })
    };

    const renderItem = ({ item }) => (
        <TouchableOpacity style={styles.card}>
            <H3 text={item.content}/>
            <Body text={item.comment}/>
            <Span text={formatDate(item.register_datetime)}/>
        </TouchableOpacity>
    );

    return (
        <Container>
            <ScrollView>
                <View style={styles.listContainer}>
                {
                  loading ? (
                    <ActivityIndicator size="large"/>
                  )  : (
                    <FlatList
                        data={history}
                        renderItem={renderItem}
                        keyExtractor={item => item.id}
                        ListEmptyComponent={
                            <View>
                                <Subtitle text='Nenhuma aula a ser listada.'/>
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