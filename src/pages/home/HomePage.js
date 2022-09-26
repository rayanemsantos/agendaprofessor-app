import React from 'react';
import { ScrollView } from "react-native";
import Container from "../../components/container";
import { CustomButtonContained } from '../../components/customButton';
import { Title } from "../../components/text";
import { useAuthContext } from '../../contexts/AuthContext';
import { logout } from '../../providers/AuthProvider';

export default function HomePage() {
    const { signOut } = useAuthContext();

    async function doLogout(){
        try {
            signOut();
            await logout();
        } catch (error) {
            console.log('error', error)
        } 
    }
    return (
        <ScrollView>
            <Container>
                <Title
                    text='Você está logado!'
                />
                <CustomButtonContained
                    text='Sair'
                    onPress={doLogout}
                />
            </Container>
        </ScrollView>
    )
};