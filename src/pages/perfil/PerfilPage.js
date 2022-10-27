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

export default function PerfilPage() {
  return (
    <ScrollView>
        <Container>
            <Title
                text='Perfil Page'
            />
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
});
