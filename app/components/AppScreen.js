import React from 'react';
import { SafeAreaView, Platform, StatusBar } from 'react-native';

function AppScreen({ style, children }) {
    return (
        <SafeAreaView style={[{
            flex: 1,
            paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
        }, style]}>{children}</SafeAreaView>
    );
}

export default AppScreen;