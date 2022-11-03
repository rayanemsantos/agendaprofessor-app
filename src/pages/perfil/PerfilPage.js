import axios from "axios";
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
import HomePage from "../home/HomePage";

export default function PerfilPage() {
  return (
    <ScrollView>
      <Container>
        <ScrollView>
          <View>
            <Title text="Dados Pessoais" />
          </View>

          <View style={styles.formContainer}>
            <AppInput label="Nome" name="name" placeholder="Insira seu nome" />

            <AppInput
              label="E-mail"
              name="email"
              placeholder="Insira seu e-mail"
            />

            <AppInput label="CPF" name="cpf" placeholder="Insira seu cpf" />

            <AppInput
              label="Escolaridade"
              name="escolaridade"
              placeholder="Insira sua escolaridade"
            />

            <AppInput
              label="PIS/PASEP"
              name="PIS/PASEP"
              placeholder="Insira seu PIS/PASEP"
            />

            <AppInput
              label="Cidade"
              name="cidade"
              placeholder="Insira sua cidade"
            />
            <CustomButtonContained
            style={styles.formButton}
              text="Alterar"
              
            />
  
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
    marginTop: 10
  }
});
