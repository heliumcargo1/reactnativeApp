import React from 'react';
import { TextInput, View } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import colors from '../config/colors';
function AppTextInput({ icon, ...otherProps }) {
    return (
        <View style={{
            flexDirection: "row",
            borderRadius: 25,
            backgroundColor: colors.white,
            width: "100%",
            padding: 15, alignItems: "center", marginVertical: 5
        }}>
            <MaterialIcons name={icon} size={24} color={colors.medium} style={{ marginRight: 10 }} />
            <TextInput style={{ color: colors.dark, fontSize: 18, }} {...otherProps} />
        </View>
    );
}

export default AppTextInput;