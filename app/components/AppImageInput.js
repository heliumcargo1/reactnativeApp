import React, { useEffect, useState, useRef } from 'react';
import * as ImagePicker from "expo-image-picker";
import { Alert, TouchableWithoutFeedback, View, StyleSheet, Image, ScrollView } from 'react-native';
import { MaterialCommunityIcons } from "@expo/vector-icons";
import colors from '../config/colors';
import { useFormikContext } from "formik";

function AppImageInput({ }) {
    const { setFieldValue, values } = useFormikContext();
    const scrollView = useRef();

    const requestPermission = async () => {
        const response = await ImagePicker.getCameraPermissionsAsync();
        if (!response.granted)
            console.log("Permission not granted");

    };
    useEffect(() => {
        requestPermission();
    }, []);
    const handleRemove = (uri) => {
        Alert.alert("Delete", "Are you sure you want to delete this image?", [
            {
                text: "Yes", onPress: () => {
                    setFieldValue("images",
                        values.images.filter((imageUri) => imageUri !== uri)
                    );
                }
            },
            { text: "No" },
        ]);

    };
    const openCamera = async () => {
        const result = await ImagePicker.launchCameraAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            quality: 0.2, allowsEditing: true
        })
        if (!result.cancelled) {
            setFieldValue("images", [...values.images, result.uri])
        }

    }
    return (
        <View style={{ flexDirection: "row" }}>
            <TouchableWithoutFeedback onPress={openCamera}>
                <View style={styles.container}>
                    <MaterialCommunityIcons
                        color={colors.medium}
                        name="camera"
                        size={40}
                    />
                </View>
            </TouchableWithoutFeedback>
            <ScrollView ref={scrollView}
                horizontal
                onContentSizeChange={() => scrollView.current.scrollToEnd()} >
                {
                    values.images.map(imgUri => {
                        return (
                            <TouchableWithoutFeedback onPress={() => handleRemove(imgUri)} key={imgUri}>
                                <View style={styles.container}>
                                    <Image source={{ uri: imgUri }} style={styles.image} />
                                </View>
                            </TouchableWithoutFeedback>
                        )
                    })
                }
            </ScrollView>
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        alignItems: "center", margin: 5,
        backgroundColor: colors.white,
        borderRadius: 15,
        height: 100,
        justifyContent: "center",
        marginVertical: 10,
        overflow: "hidden",
        width: 100,
    },
    image: {
        height: "100%",
        width: "100%",
    },
});
export default AppImageInput;