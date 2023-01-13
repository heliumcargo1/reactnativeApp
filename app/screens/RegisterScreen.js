import React, { useState } from "react";
import * as Yup from "yup";
import { Formik } from 'formik';
import { View, Text } from 'react-native';
import AppTextInput from '../components/AppTextInput';
import AppButton from '../components/AppButton';
import AppScreen from "../components/AppScreen";
import apiClient from "../api/client";
import useAuth from "../auth/useAuth";
import colors from "../config/colors";
const validationSchema = Yup.object().shape({
    name: Yup.string().required().label("Name"),
    email: Yup.string().required().email().label("Email"),
    password: Yup.string().required().min(4).label("Password"),
});
function RegisterScreen(props) {
    const auth = useAuth();

    const handleSubmit = async (userInfo) => {
        const result = await apiClient.post("/users", userInfo);

        if (!result.ok) {
            if (result.data) console.log(result.data.error);
            else {
                console.log(result);
            }
            return;
        }
        const { data: authToken } = await apiClient.post("/auth", { email: userInfo.email, password: userInfo.password });
        auth.logIn(authToken);
    };
    return (
        <AppScreen style={{
            padding: 10,
        }}>
            <Formik
                initialValues={{ name: "", email: "", password: "" }} validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                {({ handleChange, handleBlur, handleSubmit, values, errors }) => (
                    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                        <AppTextInput value={values.name} onChangeText={handleChange('name')} icon="account-circle" placeholder="Name" />
                        {errors.name && <Text style={{ color: colors.danger }}>{errors.name}</Text>}
                        <AppTextInput value={values.email} onChangeText={handleChange('email')} icon="email" placeholder="Email" textContentType="emailAddress" keyboardType="email-address" />
                        {errors.email && <Text style={{ color: colors.danger }}>{errors.email}</Text>}
                        <AppTextInput value={values.password} onChangeText={handleChange('password')} icon="lock" placeholder="Password" secureTextEntry
                            textContentType="password" />
                        {errors.password && <Text style={{ color: colors.danger }}>{errors.password}</Text>}
                        <AppButton title="Register" bgColor={colors.primary} txtColor={colors.light} onPress={handleSubmit} /></View>

                )}
            </Formik>
        </AppScreen>
    );
}

export default RegisterScreen;