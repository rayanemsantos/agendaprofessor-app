import React from "react";
import {
    StyleSheet,
    View,
    Dimensions,
    ScrollView,
    Text,
    TouchableOpacity,
    Platform,
    KeyboardAvoidingView,
    TouchableWithoutFeedback,
    Keyboard,
    Image
  } from 'react-native';
import Container from "../../components/container";
import { CustomButtonContained } from "../../components/customButton";
import { AppInput } from "../../components/customInput";
import { LogoText } from "../../components/logoText";
import { Subtitle, Title } from "../../components/text";

export default function LoginPage(props) {
    return(
        <Container>
        <ScrollView>
            <KeyboardAvoidingView
                behavior={Platform.OS == "ios" ? "padding" : "height"}
                keyboardVerticalOffset={-550}
            >
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <>
                    <LogoText/>

                    <Title
                        text='Seja bem-vindo'
                    />
                    <Subtitle
                        text='Faça login colocando sua matrícula e senha'
                    />
                    <View style={styles.formContainer}>
                        <AppInput 
                            label='Matrícula'
                            placeholder='Insira seu número de matrícula'
                        />
                        <AppInput 
                            label='Senha'
                            placeholder='Insira sua senha'
                        />    
                        <CustomButtonContained
                            text='Entrar'
                        />
                    </View>                
                    </>
                </TouchableWithoutFeedback>        
            </KeyboardAvoidingView>
        </ScrollView>
        </Container>
    )
}


const styles = StyleSheet.create({
    formContainer: {
        marginTop: 40
    },
});
