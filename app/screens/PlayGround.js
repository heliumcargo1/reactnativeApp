import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import AppButton from '../components/AppButton';
import AppScreen from '../components/AppScreen';

// Screens create PlayGround.js rsf - border, rounded corners View, text
// Components create - AppButton - Touchable, text
// Clear existing code, Import "AppButton" in Playground - 

function PlayGround(props) {
    return (
        <AppScreen style={{ justifyContent: "center", alignItems: "center" }}>
            <AppButton title="Login" bgColor="lightsteelblue" txtColor="white" />
            <AppButton title="Signup" bgColor="lightsteelblue" txtColor="white" />
        </AppScreen>

    );
}

export default PlayGround;