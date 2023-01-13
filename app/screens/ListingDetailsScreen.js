import React from "react";
import {
    View,
    StyleSheet,
    KeyboardAvoidingView,
    Platform,
    Text,
} from "react-native";
import { Image } from "react-native-expo-image-cache";

import colors from "../config/colors";
import ContactSellerForm from "../components/ContactSellerForm";
import AppListItem from "../components/AppListItem";
import AppText from "../components/AppText";

function ListingDetailsScreen({ route }) {
    const listing = route.params;
    return (
        <KeyboardAvoidingView
            behavior="position"
            keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 100}
        >
            <Image
                style={styles.image}
                preview={{ uri: listing.images[0].thumbnailUrl }}
                tint="light"
                uri={listing.images[0].url}
            />
            <View style={styles.detailsContainer}>
                <AppText style={styles.title}>{listing.title}</AppText>
                <AppText style={styles.price}>${listing.price}</AppText>
                <View style={styles.userContainer}>
                    <AppListItem
                        pic={"https://media-exp1.licdn.com/dms/image/C4E03AQG-WiizQ-XSfw/profile-displayphoto-shrink_200_200/0/1517542040635?e=1659571200&v=beta&t=QsUASH2iGnaqVmynga36ZIlnLORgGOY1ufx9y1TDoC8"}
                        title="Mohd Irfan"
                        message="5 Listings"
                    />
                </View>
                <ContactSellerForm listing={listing} />
            </View>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    detailsContainer: {
        padding: 20
    },
    image: {
        width: "100%",
        height: 240, maxHeight: 240
    },
    price: {
        color: colors.secondary,
        fontWeight: "bold",
        fontSize: 20,
        marginVertical: 10,
    },
    title: {
        fontSize: 20,
        fontWeight: "400",
    },
    userContainer: {
        marginVertical: 40,
    },
});

export default ListingDetailsScreen;
