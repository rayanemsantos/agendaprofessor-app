
import React, {useEffect, useState} from "react";
import Container from "../../components/container";
import { Title } from "../../components/text";
import {
  StyleSheet,
  View,
  ScrollView,
} from "react-native";

import { CustomButtonContained } from "../../components/customButton";
import { AppInput } from "../../components/customInput";
import { getUserData } from "../../storage/Storage";
import { changePassword } from "../../providers/SchoolClassProvider";
import { alert } from "../../utils/alertUtils";
;

export default function PerfilPage() {
  const [form, setForm] = useState({
      "formacao": "",
      "first_name": "",
      "email": "",
      "cpf": "",
  });

  const [newPassword, setNewPassword] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getUserData().then((data) => {
      setForm(JSON.parse(data))
    })
  }, []);
  
  const handleChange = (name, value) => {
    setForm((prev) => { return  {...prev, [name]: value} })
  };

  function handleChangePassword(){
    setLoading(true);
    changePassword({
      password: newPassword,
      current_passord: currentPassword
    }).then((res) => {
      alert({ 
        title: "Senha alterada com sucesso.", 
        textCancel: "Ok"
      })      
      setNewPassword('');
      setCurrentPassword('');
    }).catch((err) => {
      if(err.error){
        alert({ 
          title: err.error, 
          textCancel: "Ok"
        })              
      }
    })
    .finally(() => {
      setLoading(false);
    })
  }

  function canBeSubmitted(){
    return (
      form.first_name === '' || form.email === '' || form.cpf === '' || form.formacao === ''
    )
  };

  return (
    <ScrollView>
      <Container>
          <Title text="Dados Pessoais" />

          <View style={styles.formContainer}>
            <AppInput
              label="Nome"
              name="name"
              value={form.first_name}
              placeholder="Insira seu nome"
              disabled
            />

            <AppInput
              label="E-mail"
              value={form.email}
              name="email"
              placeholder="Insira seu e-mail"
              disabled
            />

            <AppInput
              label="CPF"
              name="cpf"
              value={form.cpf}
              placeholder="Insira seu cpf"
              disabled
            />
            
            <AppInput
              label="Formação"
              name="formacao"
              value={form.formacao}
              placeholder="Insira sua formação"
              disabled
            />

            {/* <CustomButtonContained 
              style={styles.formButton} 
              onPress={alterarDadosPerfil}
              disabled={!canBeSubmitted()}
              text="S" 
            /> */}
            <Title text="Alterar senha" />

            <AppInput
              label="Senha atual"
              name="cpf"
              value={currentPassword}
              onChangeText={setCurrentPassword}
              placeholder="Insira sua senha atual"
              disabled
            />

            <AppInput
              label="Nova senha"
              name="cpf"
              value={newPassword}
              onChangeText={setNewPassword}
              placeholder="Insira sua nova senha"
              disabled
            />       

            <CustomButtonContained 
              style={styles.formButton} 
              onPress={handleChangePassword}
              disabled={currentPassword === '' || newPassword === ''}
              text="Salvar senha" 
              loading={loading}
            />                             
          </View>
      </Container>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  formTitleContainer: {
    marginTop: 40,
  },
  formContainer: {
    marginTop: 20,
  },
  formButton: {
    marginBottom: 10,
    marginTop: 10,
  },
  formImage: {
    width: 130,
    height: 130,
    marginTop: 20,
    marginBottom: 5,
    borderRadius: 20,
    alignSelf: "center",
  },
  formIcon: {
    alignSelf: "center",
    marginBottom: 10,
    color: "#30009C",
  },
});
