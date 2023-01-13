import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import AppButton from '../components/AppButton';

// Screens create PlayGround.js rsf - border, rounded corners View, text
// Components create - AppButton - Touchable, text
// Clear existing code, Import "AppButton" in Playground - pass props - collect by destructuring in AppButton 
// Set props in AppButton

function PlayGround(props) {
    return (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }} >
            <AppButton title="Login" bgColor="red" txtColor="gold" />
            <AppButton title="Signup" bgColor="blue" txtColor="white" />
        </View>
    );
}

export default PlayGround;