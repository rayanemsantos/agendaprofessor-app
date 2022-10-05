import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";

import TurmasPage from "../pages/turmas/TurmasPage";
import LancarMediasPage from "../pages/lancarMedias/LancarMediasPage";
import HomePage from "../pages/home/HomePage";
import FrequenciaMensalPage from "../pages/frequenciaMensal/FrequenciaMensalPage";
import FrequenciaDiariaPage from "../pages/frequenciaDiaria/FrequenciaDiariaPage";
import DiarioDeClassePage from "../pages/diarioDeClasse/DiarioDeClassePage";

import { createDrawerNavigator } from "@react-navigation/drawer";

const Drawer = createDrawerNavigator();

export default function drawer() {
  return (
    <>
      <Drawer.Navigator initialRouteName="HomePage" drawerContent={props}>
        <Drawer.Screen name="Home" component={HomePage} />
        <Drawer.Screen name="Turmas" component={TurmasPage} />
        <Drawer.Screen name="Frequência Diária" component={FrequenciaDiariaPage} />
        <Drawer.Screen name="Diário De Classe" component={DiarioDeClassePage} />
        <Drawer.Screen name="Lançar Médias" component={LancarMediasPage} />
        <Drawer.Screen name="Frequência Mensal" component={FrequenciaMensalPage} />
      </Drawer.Navigator>
    </>
  );
}
