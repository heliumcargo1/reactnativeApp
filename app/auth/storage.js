import * as SecureStore from 'expo-secure-store';
import jwtDecode from "jwt-decode";

const key = "authToken";

const storeToken = async (value) => {
    try {
        await SecureStore.setItemAsync(key, value);
    }
    catch (error) {
        console.log("Error storing the auth token", error);
    }
}

const getToken = async (key) => {
    try {
        return await SecureStore.getItemAsync(key);
    } catch (error) {
        console.log("Error getting the auth token", error);
    }
}

const getUser = async () => {
    const token = await getToken(key);
    return token ? jwtDecode(token) : null
}

const removeToken = async () => {
    try {
        await SecureStore.deleteItemAsync(key);
    } catch (error) {
        console.log("Error removing the auth token", error);
    }
};

export default { getToken, getUser, removeToken, storeToken };