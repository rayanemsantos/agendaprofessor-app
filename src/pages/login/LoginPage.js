import React, {Component, useState, useContext} from 'react';
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
import Loading from '../../components/loading';
import { LogoText } from "../../components/logoText";
import { Subtitle, Title } from "../../components/text";
import { useAuthContext } from '../../contexts/AuthContext';
import { login } from '../../providers/AuthProvider';
import { setToken, setUserData } from '../../storage/Storage';

import { alert } from '../../utils/alertUtils';

export default function LoginPage(props) {
    const [form, setForm] = useState({
        username: '',
        password:  ''
    });
    const [loading, setLoading] = useState(false);
    const { signIn } = useAuthContext();

    function doLogin() {
        setLoading(true);
        login(form).then((response) => {
            console.log(response)
            let token_access = response['access'];
            let data =  {...response.data};
            
            setToken(token_access);
            setUserData(data).then((res) => {
                signIn(token_access);   
            })
        }).catch((err) => {
            alert({ 
                title: "Ops! Houve um problema ao efetuar login", 
                subtitle: "Se o problema persistir, entre em contato com suporte."
            })
            console.warn('err login', err.response)
        }).finally(() => {
            setLoading(false);
        })
    }

    const handleChangeUsername = (value) => {
        setForm((prev) => { return  {...prev, username: value} })
    };

    const handleChangePassword = (value) => {
        setForm((prev) => { return  {...prev, password: value} })
    };

    return(
        <>
        {loading && <Loading/>}
        <Container>
            <ScrollView>
                <KeyboardAvoidingView
                    behavior={Platform.OS == "ios" ? "padding" : "height"}
                    keyboardVerticalOffset={-550}
                >
                    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                        <>
                        <LogoText/>

                        <View style={styles.formTitleContainer}>
                            <Title
                                text='Seja bem-vindo'
                            />
                            <Subtitle
                                text='Realize login com a sua matrícula e senha'
                            />
                        </View>

                        <View style={styles.formContainer}>
                            <AppInput 
                                label='Matrícula'
                                name='username'
                                placeholder='Insira seu número de matrícula'
                                onChangeText={handleChangeUsername}
                                value={form.username}
                            />
                            <AppInput 
                                label='Senha'
                                secureTextEntry={true}
                                name='password'
                                placeholder='Insira sua senha'
                                onChangeText={handleChangePassword}
                                value={form.password}
                            />    
                            <CustomButtonContained
                                text='Entrar'
                                onPress={doLogin}
                                disabled={form.username === '' || form.password === ''}
                            />
                        </View>                
                        </>
                    </TouchableWithoutFeedback>        
                </KeyboardAvoidingView>
            </ScrollView>
        </Container>
        </>
    )
}

const styles = StyleSheet.create({
    formTitleContainer: {
        marginTop: 40
    },
    formContainer: {
        marginTop: 40
    },
});
