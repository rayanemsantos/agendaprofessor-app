import React from 'react';
import Container from "../../components/container";
import { Title } from "../../components/text";
import { StyleSheet, View, Dimensions, ScrollView, Text, TouchableOpacity, Platform, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, Image } from 'react-native';

export default function FrequenciaUpdatePage(props) {
    console.log(props.route.params.id)
    return (
        <ScrollView>
            <Container>
                <Title
                    text='aaaaaaaaaaaaaaaaaaaaaaaaaaa!'
                />
                <View>
                    <Text>
                        aaaaaaaaaaaaaaaaaaaaaaaaaaa!'
                    </Text>
                </View>
            </Container>
        </ScrollView>
    )
};