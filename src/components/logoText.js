import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { fontBold, fontMedium, primary } from '../assets/colors';

const styles = StyleSheet.create({
    logoContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
        marginTop: '10%'
    },
    title: {
        fontFamily: fontBold,
        fontSize: 24,
        color: primary
    },
    subtitle: {
        fontFamily: fontMedium,
        fontSize: 24,
        marginLeft: 5, 
        color: primary
    },
});

export const LogoText = ({ text, ...props }) => (
    <View style={styles.logoContainer}>
        <Text style={styles.title} {...props}>
            Agenda do
        </Text>
        <Text style={styles.subtitle} {...props}>
            Professor
        </Text>    
    </View>
);