import React from 'react';
import { Button, FlatList, View } from 'react-native';
import AppScreen from '../components/AppScreen';
import useAuth from '../auth/useAuth';
import colors from "../config/colors";
import AppListItem from '../components/AppListItem';
import AppIcon from "../components/AppIcon";

import ListItemSeparator from "../components/ListItemSeparator"
const menuItems = [
    {
        title: "My Listings",
        icon: {
            name: "format-list-bulleted",
            backgroundColor: colors.primary,
        },
        targetScreen: "Home"
    },
    {
        title: "My Messages",
        icon: {
            name: "email",
            backgroundColor: colors.secondary,
        },
        targetScreen: "Messages"
    },
];
function AccountScreen({ navigation }) {
    const { user, logOut } = useAuth();
    console.log(user);
    return (
        <AppScreen>
            <View style={{ backgroundColor: colors.light, }}>
                <AppListItem
                    title={user.name}
                    message={user.email}
                    pic={"https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=100"}
                />
            </View>
            <View style={{
                backgroundColor: colors.light,
            }}>
                <FlatList
                    data={menuItems}
                    keyExtractor={(menuItem) => menuItem.title}
                    ItemSeparatorComponent={ListItemSeparator}
                    renderItem={({ item }) => (
                        <AppListItem
                            title={item.title}
                            IconComponent={
                                <AppIcon
                                    name={item.icon.name}
                                    backgroundColor={item.icon.backgroundColor}
                                />
                            }
                            onPress={() => navigation.navigate(item.targetScreen)}
                        />
                    )}
                />
            </View>
            <AppListItem
                title="Log Out"
                onPress={() => logOut()}
            /></AppScreen>
    );
}

export default AccountScreen;