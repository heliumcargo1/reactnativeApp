import React, { useState } from 'react';
import { MaterialCommunityIcons } from "@expo/vector-icons";
import colors from '../config/colors';
import AppScreen from "../components/AppScreen";
//import PickerItem from './PickerItem';
import { TextInput, StyleSheet, View, Text, TouchableWithoutFeedback, Modal, Button, FlatList } from 'react-native';
import PickerItem from './PickerItem';

function AppPicker({ icon, placeholder, items, onSelectItem, selectedItem }) {
    const [modalVisible, setModalVisible] = useState(false);

    return (
        <><TouchableWithoutFeedback onPress={() => setModalVisible(true)}>
            <View style={{
                backgroundColor: colors.white, borderRadius: 25, flexDirection: "row",
                alignItems: "center", width: "100%", padding: 15, marginVertical: 10,
            }}>
                <MaterialCommunityIcons name={icon} size={25} color={colors.medium} style={{ marginRight: 10 }}></MaterialCommunityIcons>
                <Text style={{ flex: 1, fontSize: 16, color: "grey" }}>{selectedItem ? selectedItem.name : placeholder}</Text>
                <MaterialCommunityIcons
                    name="chevron-down"
                    size={20}
                    color={colors.medium}
                />
            </View>
        </TouchableWithoutFeedback>
            <Modal visible={modalVisible} animationType="slide">
                <AppScreen>
                    <FlatList data={items} keyExtractor={(item) => item.id} numColumns={3}
                        renderItem={({ item }) => (
                            <PickerItem name={item.name} icon={item.icon}
                                backgroundColor={item.backgroundColor} onSelectItem={() => { onSelectItem(item); setModalVisible(false) }} />
                        )} />
                    <Button onPress={() => setModalVisible(false)} title="Close" color={colors.secondary} />
                </AppScreen>
            </Modal>
        </>

    );
}

export default AppPicker;