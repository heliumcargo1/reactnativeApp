import React, { useState } from 'react';
import AppScreen from '../components/AppScreen';
import { View, Image, Text, TouchableHighlight } from 'react-native';
import AppText from '../components/AppText';
import AppTextInput from '../components/AppTextInput';
import AppButton from '../components/AppButton';
import colors from '../config/colors';
import { Formik } from 'formik';
import * as yup from 'yup';
import apiClient from '../api/client';
import storage from '../auth/storage';
import useAuth from "../auth/useAuth";

const loginValidationSchema = yup.object().shape({
    email: yup
        .string()
        .email("Please enter valid email")
        .required('Email Address is Required'),
    password: yup
        .string()
        .min(3, ({ min }) => `Password must be at least ${min} characters`)
        .required('Password is required'),
})

function LoginScreen({ navigation }) {
    const { logIn } = useAuth();

    const [message, setMessage] = useState();
    const [formStatus, setFormStatus] = useState(true);

    const doLogin = async (values) => {
        const response = await apiClient.post('/auth', values);
        // If response is ok, that means api call was successfull
        if (response.ok) {
            logIn(response.data);
        }
        else {
            setMessage(response.data.error);
        }

    }
    return (
        <AppScreen style={{ backgroundColor: "bisque", padding: 5 }}>
            <Image style={{ width: 300, height: 200, alignSelf: "center" }} source={{ uri: 'https://www.classicsnl.nl/en/wp-content/uploads/2014/10/sample-logo.png' }}
            />
            <Formik
                initialValues={{ email: '', password: '' }} validationSchema={loginValidationSchema}
                onSubmit={values => doLogin(values)}
            >
                {({ handleChange, handleBlur, handleSubmit, values, errors }) => (
                    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                        <AppTextInput value={values.email} onChangeText={handleChange('email')} icon="email" placeholder="Enter email" />
                        {errors.email && <Text style={{ color: colors.danger }}>{errors.email}</Text>}
                        <AppTextInput value={values.password} onChangeText={handleChange('password')} icon="lock" placeholder="Enter password" secureTextEntry={true} />
                        {errors.password && <Text style={{ color: colors.danger }}>{errors.password}</Text>}
                        <AppButton title="LOGIN" bgColor={colors.primary} txtColor={colors.light} onPress={handleSubmit} />
                        <View style={{ width: "100%", height: 60, justifyContent: "flex-start", alignItems: "center" }}>
                            <AppText style={{ color: formStatus ? colors.success : colors.danger }}>{message}</AppText>
                        </View>
                    </View>
                )}
            </Formik>
        </AppScreen>
    );
}

export default LoginScreen;