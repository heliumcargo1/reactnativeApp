import React from 'react';
import { Text, TouchableHighlight } from 'react-native';

function AppButton({ bgColor, title, txtColor, onPress }) {
    return (
        <TouchableHighlight onPress={onPress} style={{
            borderWidth: 4, borderColor: "white",
            width: "100%", height: 80, justifyContent: "center", alignItems: "center",
            borderRadius: 40, backgroundColor: bgColor, marginVertical: 5
        }} >
            <Text style={{ fontSize: 25, color: txtColor }}>{title}</Text>
        </TouchableHighlight>
    );
}

export default AppButton;