import React, {useEffect, useState} from 'react';
import { ScrollView, FlatList, View, StyleSheet } from "react-native";
import Container from "../../components/container";
import { Title, Subtitle, Body, H3, H4, H5 } from "../../components/text";
import { fetchEvents } from '../../providers/SchoolClassProvider';

// import Timeline from 'react-native-timeline-flatlist'
import dateUtil from '../../utils/dateUtil';


export default function HomePage() {
    const days = ["Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado", "Domingo"];
    const [events, setEvents] = useState([]);
    const formatDate = dateUtil.formatDate;
    const parseDate = dateUtil.parseDate;

    function handleEvents(){
        fetchEvents().then((res) => {
            setEvents(res.map((item) => {
                let date = parseDate(item.date_schedule); 
                let dateFormatted = formatDate(item.date_schedule, "DD"); 
                return {
                    id: item.id,
                    title: item.title,
                    description: item.description,
                    day: dateFormatted,
                    dayWeek: days[date.getDay()]
                }
            }));
        }).catch((err) => console.log(err))
    }

    useEffect(() => {
        handleEvents();
    }, []);

    const renderItem = ({ item }) => (
        <View style={styles.itemSchedule}>
            <View style={{alignItems: 'center', width: '22%' }}>
                <Title style={{marginBottom: 5}} text={item.day}/>
                <H5 style={{marginBottom:0, marginTop: 0}} text={item.dayWeek}/>
            </View>
            <View style={{maxWidth: '70%', marginLeft: 16 }}>
                <Body text={item.title}/>
            </View>
        </View>
    );
    
    return (
        <ScrollView>
            <Container>
                <Title
                    text='Bem vindo!'
                />
                <Subtitle
                    text='Calendário letivo'
                />                
                <FlatList
                    data={events}
                    renderItem={renderItem}
                    keyExtractor={item => item.id}
                    ListEmptyComponent={
                        <View>
                            <Subtitle text='Nenhuma evento a ser listado.'/>
                        </View>                        
                    }
                    style={{marginTop: 16}}
                />              
            </Container>    
        </ScrollView>    
    )
};
const styles = StyleSheet.create({
    itemSchedule: {
        paddingTop: 12,
        paddingBottom: 12, 
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: 0.6,
        borderBottomColor: 'rgba(0,0,0,0.1)'
    },
});
