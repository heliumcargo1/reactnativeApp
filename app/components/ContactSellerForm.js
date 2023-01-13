import React from "react";
import { Alert, Keyboard } from "react-native";
import { Notifications } from "expo";
import * as Yup from "yup";
import AppTextInput from "./AppTextInput";
import AppButton from "./AppButton";
import { Formik } from 'formik';
import apiClient from "../api/client";
import colors from "../config/colors";
const validationSchema = Yup.object().shape({
    message: Yup.string().required().min(1).label("Message"),
});

function ContactSellerForm({ listing }) {
    const handleSubmit = async ({ message }, { resetForm }) => {
        Keyboard.dismiss();
        //const listingId
        const result = await apiClient.post("/messages", { message, listingId: listing.id, });
        console.log(result);
        if (!result.ok) {
            console.log("Error", result);
            return Alert.alert("Error", "Could not send the message to the seller.");
        }

        resetForm();
    };

    return (
        <Formik initialValues={{ message: "" }}
            onSubmit={handleSubmit}
            validationSchema={validationSchema}
        >
            {({ handleChange, handleSubmit, values, errors }) => (
                <>
                    <AppTextInput maxLength={255} multiline placeholder="Type your message" onChangeText={handleChange("message")} value={values.message} />
                    <AppButton title="Contact Seller" bgColor={colors.primary} txtColor={colors.white} onPress={handleSubmit} />
                </>
            )}
        </Formik>
    );
}



export default ContactSellerForm;
