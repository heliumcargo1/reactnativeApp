import React from 'react';
import { Text, View, Image, StyleSheet, TouchableHighlight } from 'react-native';
import { MaterialCommunityIcons } from "@expo/vector-icons";
import colors from '../config/colors';
function AppListItem({ title, pic, message, onPress, IconComponent, }) {
    return (
        <TouchableHighlight underlayColor={colors.light} onPress={onPress}>
            <View style={styles.container}>
                {IconComponent}
                {pic && <Image style={styles.image} source={{ uri: pic }} />}
                <View style={styles.detailsContainer}>
                    <Text style={styles.title} numberOfLines={1}>
                        {title}
                    </Text>
                    {message && (
                        <Text style={styles.message} numberOfLines={2}>
                            {message}
                        </Text>
                    )}
                </View>
                <MaterialCommunityIcons
                    color={colors.medium}
                    name="chevron-right"
                    size={25}
                />
            </View>
        </TouchableHighlight>
    )
}
const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        flexDirection: "row",
        padding: 15,
        backgroundColor: colors.white,
    },
    detailsContainer: {
        flex: 1,
        marginLeft: 10,
        justifyContent: "center",
    },
    image: {
        width: 70,
        height: 70,
        borderRadius: 35,
    },
    subTitle: {
        color: colors.medium,
    },
    title: {
        fontWeight: "500",
    },
});

export default AppListItem;