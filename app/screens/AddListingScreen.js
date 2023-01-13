import React, { useState, useEffect } from 'react';
import { Button, Image, View, Alert, Text } from 'react-native';
import AppScreen from '../components/AppScreen';
import * as ImagePicker from 'expo-image-picker';
import * as Location from 'expo-location';
import apiClient from '../api/client';
import { Formik } from 'formik';
import * as yup from 'yup';
import AppTextInput from '../components/AppTextInput';
import AppPicker from '../components/AppPicker';
import AppImageInput from '../components/AppImageInput';
import AppButton from '../components/AppButton';
import colors from '../config/colors';
import UploadScreen from "./UploadScreen";

function AddListingScreen({ navigation }) {
    const [image, setImage] = useState(null);
    const [location, setLocation] = useState();
    const [categories, setCategories] = useState([]);
    const [category, setCategory] = useState();
    const [progress, setProgress] = useState(0);
    const [uploadVisible, setUploadVisible] = useState(false);

    const loadCategories = async () => {
        const response = await apiClient.get("/categories");
        if (response.ok) {
            setCategories(response.data);
        }
        else
            Alert.alert("Unable to connect to backend");
    }

    const galleryImage = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });
        console.log(result);
        if (!result.cancelled)
            setImage(result.uri);
    }
    const cameraImage = async () => {
        const readCameraPermission = await ImagePicker.getCameraPermissionsAsync();
        if (readCameraPermission.granted === false) {
            const requestCamPermissions = await ImagePicker.requestCameraPermissionsAsync();
            if (requestCamPermissions.granted === false) {
                Alert.alert(
                    "Camera permission is required to avail all the features of the app."
                );
                return;
            }
        }
        const camPic = await ImagePicker.launchCameraAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            quality: 0.2,
            aspect: [4, 4],
            allowsEditing: true,
        })
        if (!camPic.cancelled)
            setImage(camPic.uri);
    }
    const mobileLocation = async () => {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
            Alert.alert("Give location permission");
            return;
        }
        const { coords: { latitude, longitude } } = await Location.getCurrentPositionAsync({});
        setLocation({ latitude, longitude });
    }
    useEffect(() => {
        mobileLocation();
        loadCategories();
    }, []);
    const postListing = async (values) => {
        let formValues = { ...values, location }
        console.log(formValues);
        setProgress(0);

        const data = new FormData();
        data.append("title", formValues.title);
        data.append("price", formValues.price);
        data.append("categoryId", formValues.categoryId);
        data.append("description", formValues.description);

        formValues.images.forEach((image, index) =>
            data.append("images", {
                name: "image" + index,
                type: "image/jpeg",
                uri: image,
            })
        );

        if (formValues.location)
            data.append("location", JSON.stringify(formValues.location));
        console.log(data);

        setUploadVisible(true);
        const response = await apiClient.post("/listings", data, { onUploadProgress: (progress) => setProgress(progress.loaded / progress.total) });
        if (response.ok) {
            setUploadVisible(false);
            navigation.navigate("Home");
        }

        else {
            console.log(response);
            setUploadVisible(false);
            console.log("Failed to post");
        }

    }
    return (
        <AppScreen style={{ backgroundColor: colors.light, flex: 1, padding: 10 }}>
            <UploadScreen
                onDone={() => setUploadVisible(false)}
                progress={progress}
                visible={uploadVisible}
            />
            <Formik
                initialValues={{ title: '', price: '', description: '', images: [], categoryId: '' }}
                onSubmit={values => postListing(values)}
            >
                {({ setFieldValue, handleChange, handleBlur, handleSubmit, values, errors }) => (
                    <>
                        <AppImageInput />
                        <AppTextInput icon="subtitles" placeholder="Title" onChangeText={handleChange("title")} value={values.title} />
                        <AppTextInput icon="payments" placeholder="Price" onChangeText={handleChange("price")} value={values.price} />
                        <AppTextInput icon="description" placeholder="Description" onChangeText={handleChange("description")} value={values.description} />
                        <AppPicker items={categories} selectedItem={category} placeholder="Category" icon="apps" onSelectItem={(item) => { setFieldValue("categoryId", item.id); setCategory(item) }} />
                        <AppButton title="Post Listing" bgColor={colors.primary} txtColor={colors.white} onPress={handleSubmit} />
                    </>
                )}
            </Formik>
        </AppScreen>
    );
}

export default AddListingScreen;