// import axios from "axios";
import React, { useEffect, useState } from "react";
import Container from "../../components/container";
import { Subtitle, Title } from "../../components/text";
import SelectList from "react-native-dropdown-select-list";
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
  Image,
} from "react-native";

import { URL_BASE } from "../../providers/config";
import { CustomButtonContained } from "../../components/customButton";
import { getToken, getUserData } from "../../storage/Storage";
import { AppInput } from "../../components/customInput";
import ImagemPerfil from "../../assets/imagem-perfil.png";

import Icon from "react-native-vector-icons/FontAwesome";

export default function PerfilPage() {

  const [name, onChangeName] = React.useState("CAMILA DE OLIVEIRA MEDEIROS");
  const [email, onChangeEmail] = React.useState("camifet@email.com.br");

  const [cpf, onChangeCpf] = React.useState("022.242.292-00");
  const [escolaridade, onChangeEscolaridade] = React.useState("ESPECIALISTA");
  const [pisPasep, onChangePisPasep] = React.useState("156224678");
  const [cidade, onChangeCidade] = React.useState("Fortaleza, Ceará");
 
  return (
    <ScrollView>
      <Container>
        <ScrollView>
          <View>
            <Title text="Dados Pessoais" />
          </View>

          <View style={styles.formContainer}>
            <AppInput
              label="Nome"
              name="name"
              onChangeText={onChangeName}
              value={name}
              placeholder="Insira seu nome"
            />

            <AppInput
              label="E-mail"
              onChangeText={onChangeEmail}
              value={email}
              name="email"
              placeholder="Insira seu e-mail"
            />

            <AppInput
              label="CPF"
              name="cpf"
              onChangeText={onChangeCpf}
              value={cpf}
              placeholder="Insira seu cpf"
            />

            <AppInput
              label="Escolaridade"
              name="escolaridade"
              onChangeText={onChangeEscolaridade}
              value={escolaridade}
              placeholder="Insira sua escolaridade"
            />

            <AppInput
              label="PIS/PASEP"
              name="PIS/PASEP"
              onChangeText={onChangePisPasep}
              value={pisPasep}
              placeholder="Insira seu PIS/PASEP"
            />

            <AppInput
              label="Cidade"
              name="cidade"
              onChangeText={onChangeCidade}
              value={cidade}
              placeholder="Insira sua cidade"
            />
            <CustomButtonContained style={styles.formButton} text="Alterar" />
          </View>
        </ScrollView>
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
