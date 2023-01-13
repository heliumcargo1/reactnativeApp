import React from 'react';
import { Image, ImageBackground, Text, View } from 'react-native';
import AppButton from '../components/AppButton';
import AppScreen from '../components/AppScreen';

function WelcomeScreen({ navigation }) {
    return (
        <AppScreen style={{ paddingTop: 0 }}><ImageBackground
            source={{ uri: 'https://d3h2k7ug3o5pb3.cloudfront.net/image/2020-11-23/70fbb950-2d79-11eb-9dcd-8b2ef5358591.jpg' }}
            style={{ flex: 1, justifyContent: "flex-end", alignItems: "center" }}>
            <View style={{
                flex: 1, justifyContent: "flex-start",
                alignItems: "center", paddingTop: 30
            }}>
                <Image style={{ width: 300, height: 200 }} source={{ uri: 'https://www.classicsnl.nl/en/wp-content/uploads/2014/10/sample-logo.png' }}
                />
                <Text style={{ color: "white" }}>At NASA, we make Air and Space available for everyone.</Text>
            </View>
            <AppButton bgColor="lightskyblue" txtColor="navy" title="Login" onPress={() => navigation.navigate("Login")} />
            <AppButton bgColor="lightskyblue" txtColor="navy" title="Register" onPress={() => navigation.navigate("Register")} />
        </ImageBackground></AppScreen>
    );
}

export default WelcomeScreen;