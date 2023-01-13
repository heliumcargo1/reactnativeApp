import React from 'react';
import { TouchableOpacity, View, Text, Image } from 'react-native';

function AppCard({ imgUrl, title, price, onPress }) {
    return (
        <TouchableOpacity onPress={onPress} style={{
            backgroundColor: "white", borderRadius: 15,
            overflow: "hidden", width: "100%", marginBottom: 10
        }}>
            <Image source={{ uri: imgUrl }} style={{ width: "100%", height: 200, }} />
            <View style={{ padding: 20 }}>
                <Text style={{ fontSize: 20 }}>{title}</Text>
                <Text style={{ fontSize: 16, color: "teal" }}>${price}</Text></View>
        </TouchableOpacity>
    );
}

export default AppCard;