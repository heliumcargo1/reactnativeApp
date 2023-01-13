import React from 'react';
import { Text, View } from 'react-native';

function PlayGround(props) {
    return (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }} >
            <View
                style={{
                    elevation: 40, shadowColor: "red", width: 200, height: 200, borderRadius: 100,
                    backgroundColor: "gold", borderWidth: 8, borderColor: "tomato"
                }}>
            </View>
            <Text style={{
                fontSize: 40, color: "red", fontWeight: "bold", fontFamily: "Roboto",
                textTransform: "capitalize", lineHeight: 80, textAlign: "center", fontStyle: "italic"
            }} >My tag line. This is my new second line. Some text to follow .... ...</Text>
        </View>
    );
}

export default PlayGround;