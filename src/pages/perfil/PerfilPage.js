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

export default function PerfilPage(props) {
  const [schoolClassSubjectList, setSchoolClassSubjectList] = useState([]);
  const [schoolClassSubjectSelected, setSchoolClassSubjectSelected] =
    useState("");
  const [schoolClassSubject, setSchoolClassSubject] = useState("");

  useEffect(() => {
    const getClasses = async () => {
      const userToken = await getToken();
      const userData = await getUserData();
      console.log(`Bearer ${JSON.parse(userToken)}`);

      const response = await fetch(
        "https://agenda-professor-api.herokuapp.com/api/school_class_subject",
        {
          method: "GET",
          headers: new Headers({
            Authorization: `Bearer ${JSON.parse(userToken)}`,
          }),
        }
      ).then(function (response) {
        return response.json();
      });

      const { id: teacherId } = JSON.parse(userData);

      const filtered = response.filter((item) => item.teacher == teacherId);
      setSchoolClassSubject(filtered);

      const listSelect = filtered.map((item) => ({
        key: item.id,
        value:
          item.school_class.serie +
          " " +
          item.school_class.identification +
          " | " +
          item.subject +
          " | " +
          item.school_class.shift,
      }));

      setSchoolClassSubjectList(listSelect);
    };

    getClasses();
  }, []);

  const showStudents = () => {
    // vai exibir os estudantes de school class subject
    // const [ students_subject ] = schoolClassSubjectList[schoolClassSubject]
    const obj = schoolClassSubject.filter(
      (item) => item.id == schoolClassSubjectSelected
    );

    if (obj.length) {
      // const [students_subject] = obj[0]
      console.log(obj[0].students_subject);
    }
  };

  return (
    <ScrollView>
      <Container>
        <ScrollView>
          <View>
            <Title text="Dados Pessoais" />
          </View>

          <View>
            <Image source={ImagemPerfil} style={styles.formImage} />
            <Icon name="edit" size={30} style={styles.formIcon} />
          </View>

          {/* <View style={styles.formTitleContainer}>
            <Subtitle style={styles.formTitleConta} text="Turma" />
            <SelectList
              setSelected={setSchoolClassSubjectSelected}
              data={schoolClassSubjectList}
            />
          </View> */}

          <View style={styles.formContainer}>
            <AppInput
              label="Nome"
              name="name"
              value="CAMILA DE OLIVEIRA MEDEIROS"
              placeholder="Insira seu nome"
            />

            <AppInput
              label="E-mail"
              value="camifet@email.com.br"
              name="email"
              placeholder="Insira seu e-mail"
            />

            <AppInput
              label="CPF"
              name="cpf"
              value="022.242.292-00"
              placeholder="Insira seu cpf"
            />

            <AppInput
              label="Escolaridade"
              name="escolaridade"
              value="ESPECIALISTA"
              placeholder="Insira sua escolaridade"
            />

            <AppInput
              label="PIS/PASEP"
              name="PIS/PASEP"
              value="156224678"
              placeholder="Insira seu PIS/PASEP"
            />

            <AppInput
              label="Cidade"
              name="cidade"
              value="Fortaleza, Ceará"
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
