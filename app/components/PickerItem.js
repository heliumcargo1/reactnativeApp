import React from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';
import AppIcon from "../components/AppIcon";
function PickerItem({ name, icon, backgroundColor, onSelectItem }) {
    return (
        <TouchableOpacity onPress={onSelectItem} style={{ padding: 15, alignItems: "center" }}>
            <AppIcon name={icon} size={100} backgroundColor={backgroundColor} />
            <Text style={{ fontSize: 16 }}>{name}</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    text: {
        padding: 20,
    },
});
export default PickerItem;