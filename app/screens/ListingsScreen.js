import React, { useState, useEffect } from 'react';
import { FlatList, View } from 'react-native';
import AppCard from '../components/AppCard';
import AppScreen from '../components/AppScreen';
import apiClient from '../api/client';

function ListingsScreen({ navigation }) {
    const [listings, setListings] = useState([]);

    const getListings = async () => {
        const response = await apiClient.get("/listings");
        if (response.ok)
            setListings(response.data.reverse());
        else
            console.log("Error occurred by fetching data from backend.")
    }
    useEffect(() => {
        getListings();
    }, []);
    return (
        <AppScreen style={{
            justifyContent: "flex-start", alignItems: "center",
            backgroundColor: "lightgrey", padding: 10,
        }}>
            <View style={{ flex: 1, width: "100%" }}>
                <FlatList data={listings} keyExtractor={(item, index) => index}
                    renderItem={({ item }) => {
                        return <AppCard title={item.title}
                            price={item.price} imgUrl={item.images[0].url} onPress={() => navigation.navigate("ListingDetails", item)} />
                    }} /></View>
        </AppScreen>
    );
}

export default ListingsScreen;