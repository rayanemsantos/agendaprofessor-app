import React from 'react';
import { Text, StyleSheet } from 'react-native';
import { fontBold, fontMedium, primary } from '../assets/colors';

const styles = StyleSheet.create({
    h1: {
        fontFamily: fontBold,
        fontSize: 24,
        marginBottom: 16,
        color: primary
    },
    subtitle: {
        fontFamily: fontMedium,
        fontSize: 20,
        marginBottom: 16,
        opacity: 0.5
    },
});

export const Title = ({ text, ...props }) => (
    <Text style={styles.h1} {...props}>{text}</Text>
);

export const Subtitle = ({ text, style={}, ...props }) => (
    <Text style={[styles.subtitle, style]} {...props}>{text}</Text>
);