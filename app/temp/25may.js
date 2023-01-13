import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, Button, Alert, TouchableWithoutFeedback, TouchableHighlight, TouchableOpacity } from 'react-native';

export default function App() {
    const textPress = () => {
        console.log("OnPress event is fired, Text is clicked - response from function")
    }
    const getData = () => {
        Alert.alert("Backend Data", "Do you really want data?", [
            { text: "Cancel", onPress: () => console.log("Confused") },
            { text: "Yes", onPress: () => console.log("Fetching data") },
            { text: "No", onPress: () => console.log("No data fetch") }]);
        console.log("Connecting to backend ....");
        console.log("Data received ....");
    }
    return (
        <View style={styles.container}>
            <Text numberOfLines={1} onLongPress={() => console.log("Long pressed")}
                onPress={() => textPress()}>This is my First app in ASDC.... .... . This is my second line in ASDC.</Text>
            <TouchableOpacity onPress={() => console.log("Image Touched - Opacity!")}>
                <Image style={{ width: 200, height: 300 }} blurRadius={0} fadeDuration={3000}
                    source={{ uri: 'https://picsum.photos/200/300' }} />
            </TouchableOpacity>
            <Button title="Get Data" color={'green'} onPress={() => getData()} />
            <StatusBar style="auto" />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        alignItems: "center", justifyContent: "center"
    },
});
