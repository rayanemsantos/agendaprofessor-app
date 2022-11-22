import React, {useEffect, useState} from 'react';
import { ScrollView, FlatList, View } from "react-native";
import Container from "../../components/container";
import { Title, Subtitle, Body, H3 } from "../../components/text";
import { fetchEvents } from '../../providers/SchoolClassProvider';

// import Timeline from 'react-native-timeline-flatlist'
import dateUtil from '../../utils/dateUtil';


export default function HomePage() {
    const [events, setEvents] = useState([]);
    const formatDate = dateUtil.formatDate;

    function handleEvents(){
        fetchEvents().then((res) => {
            console.warn(res)
            setEvents(res.map((item) => {
                return {
                    title: item.title,
                    description: item.description,
                    time: formatDate(item.date_schedule, 'DD/MM')
                }
            }));
        })
    }

    useEffect(() => {
        handleEvents();
    }, []);

    const renderItem = ({ item }) => (
        <View style={{padding: 16, backgroundColor: '#f1f1f1', borderRadius: 8, marginBottom:12}}>
            <Title text={item.time}/>
            <Subtitle text={item.title}/>
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
                    keyExtractor={item => item.title}
                    ListEmptyComponent={
                        <View>
                            <Subtitle text='Nenhuma aula a ser listada.'/>
                        </View>                        
                    }
                />              
            </Container>    
        </ScrollView>    
    )
};