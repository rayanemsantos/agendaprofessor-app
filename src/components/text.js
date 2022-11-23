import React from 'react';
import { Text, StyleSheet } from 'react-native';
import { fontBold, fontMedium, fontRegular, primary } from '../assets/colors';

const styles = StyleSheet.create({
    h1: {
        fontFamily: fontBold,
        fontSize: 24,
        marginTop: 16,
        marginBottom: 16,
        color: primary
    },
    subtitle: {
        fontFamily: fontMedium,
        fontSize: 20,
        marginBottom: 16,
        opacity: 0.5
    },
    H5: {
        fontFamily: fontRegular,
        fontSize: 14,
        marginTop: 16,
        marginBottom: 16
    },      
    H4: {
        fontFamily: fontRegular,
        fontSize: 16,
        marginTop: 16,
        marginBottom: 16
    },     
    H3: {
        fontFamily: fontRegular,
        fontSize: 18,
        marginTop: 16,
        marginBottom: 16
    },    
    span: {
        fontFamily: fontRegular,
        fontSize: 16,
        marginBottom: 16
    },
    body: {
        fontFamily: fontRegular,
        fontSize: 14,
        marginBottom: 16
    },
});

export const Title = ({ text, style={}, ...props }) => (
    <Text style={[styles.h1, style]} {...props}>{text}</Text>
);

export const Subtitle = ({ text, style={}, ...props }) => (
    <Text style={[styles.subtitle, style]} {...props}>{text}</Text>
);

export const H3 = ({ text, style={}, ...props }) => (
    <Text style={[styles.H3, style]} {...props}>{text}</Text>
);
export const H4 = ({ text, style={}, ...props }) => (
    <Text style={[styles.H4, style]} {...props}>{text}</Text>
);
export const H5 = ({ text, style={}, ...props }) => (
    <Text style={[styles.H5, style]} {...props}>{text}</Text>
);

export const Span = ({ text, style={}, ...props }) => (
    <Text style={[styles.span, style]} {...props}>{text}</Text>
);

export const Body = ({ text, style={}, ...props }) => (
    <Text style={[styles.body, style]} {...props}>{text}</Text>
);
