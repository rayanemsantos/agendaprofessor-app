import React from 'react';
import { ScrollView } from "react-native";
import Container from "../../components/container";
import { Title } from "../../components/text";

export default function HomePage() {

    return (
        <ScrollView>
            <Container>
                <Title
                    text='Bem vindo!'
                />
            </Container>
        </ScrollView>
    )
};