import React from "react";
import { ScrollView, View, Text } from "react-native";
import Container from "../../components/container";
import { CustomButtonContained } from "../../components/customButton";
import { Title } from "../../components/text";
import { useAuthContext } from "../../contexts/AuthContext";
import { logout } from "../../providers/AuthProvider";

export default function HomePage() {
  const { signOut } = useAuthContext();

  async function doLogout() {
    try {
      signOut();
      await logout();
    } catch (error) {
      console.log("error", error);
    }
  }
  return (
    <ScrollView>
      <Container>
        <Title text="Você está logado!" />

        <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text> Olá, esse é a página Home </Text>
    </View>

        <CustomButtonContained text="Sair" onPress={doLogout} />
      </Container>
    </ScrollView>
  );
}
