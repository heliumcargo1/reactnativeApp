import React, { useState, useEffect, useRef } from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
const Tab = createBottomTabNavigator();
import NewListingButton from './NewListingButton';
import AccountNavigator from "./AccountNavigator";
import FeedNavigator from './FeedNavigator';
import AddListingScreen from '../screens/AddListingScreen';
import AccountScreen from '../screens/AccountScreen';
import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';
import { Platform } from 'react-native';
import apiClient from '../api/client';
export default function App() {
    const [expoPushToken, setExpoPushToken] = useState('');
    useEffect(() => {
        registerForPushNotificationsAsync().then(async token => { await apiClient.post("/expoPushTokens", { token: token }); setExpoPushToken(token) });
    }, []);
    async function registerForPushNotificationsAsync() {
        let token;
        if (Device.isDevice) {
            const { status: existingStatus } = await Notifications.getPermissionsAsync();
            let finalStatus = existingStatus;
            if (existingStatus !== 'granted') {
                const { status } = await Notifications.requestPermissionsAsync();
                finalStatus = status;
            }
            if (finalStatus !== 'granted') {
                alert('Failed to get push token for push notification!');
                return;
            }
            token = (await Notifications.getExpoPushTokenAsync()).data;
            console.log(token);
        } else {
            alert('Must use physical device for Push Notifications');
        }

        if (Platform.OS === 'android') {
            Notifications.setNotificationChannelAsync('default', {
                name: 'default',
                importance: Notifications.AndroidImportance.MAX,
                vibrationPattern: [0, 250, 250, 250],
                lightColor: '#FF231F7C',
            });
        }

        return token;
    }
    return (
        <Tab.Navigator>
            <Tab.Screen name="Home" component={FeedNavigator} options={{
                headerShown: false,
                tabBarIcon: ({ color, size }) => (
                    <MaterialCommunityIcons name="home" color={color} size={size} />
                ),
            }} />
            <Tab.Screen name="Add" component={AddListingScreen} options={({ navigation }) => ({
                tabBarButton: () => (
                    <NewListingButton
                        onPress={() => navigation.navigate("Add")}
                    />
                ),
                tabBarIcon: ({ color, size }) => (
                    <MaterialCommunityIcons
                        name="plus-circle"
                        color={color}
                        size={size}
                    />
                ),
            })} />
            <Tab.Screen
                name="Account"
                component={AccountNavigator}
                options={{
                    headerShown: false,
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons name="account" color={color} size={size} />
                    ),
                }}
            />
        </Tab.Navigator>
    );
}