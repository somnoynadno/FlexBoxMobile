import {StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';

export const commonStyles = StyleSheet.create({
    container: {
        flex: 1,
        height: "100%",
        alignContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'center',
    },
    buttonText: {
        fontSize: 24,
        color: "white",
    },
    textInput: {
        fontSize: 26,
    },
    screenTitle: {
        borderRadius: 6,
        color: '#20232a',
        textAlign: 'center',
        fontSize: 32,
        marginBottom: 10,
    },
    secondaryText: {
        color: '#41454c',
        fontSize: 20,
        marginBottom: 2,
    },
    orangeButton: {
        backgroundColor: 'orange',
        alignItems: 'center',

        paddingTop: 8,
        paddingBottom: 8,
        paddingLeft: 15,
        paddingRight: 15,

        shadowColor: '#000',
        shadowOffset: {
            width: 4,
            height: 4,
        },
        shadowOpacity: 0.4,
        shadowRadius: 3,

        elevation: 4,
    },
    blueButton: {
        backgroundColor: 'blue',
        alignItems: 'center',

        paddingTop: 8,
        paddingBottom: 8,
        paddingLeft: 15,
        paddingRight: 15,

        shadowColor: '#000',
        shadowOffset: {
            width: 4,
            height: 4,
        },
        shadowOpacity: 0.4,
        shadowRadius: 3,

        elevation: 4,
    },
    redButton: {
        backgroundColor: 'red',
        alignItems: 'center',

        paddingTop: 8,
        paddingBottom: 8,
        paddingLeft: 15,
        paddingRight: 15,

        shadowColor: '#000',
        shadowOffset: {
            width: 4,
            height: 4,
        },
        shadowOpacity: 0.4,
        shadowRadius: 3,

        elevation: 4,
    },
    divider: {
        marginTop: "8%",
    },
    errorDisplay: {
        fontSize: 16,
        color: "red",
    }
})
