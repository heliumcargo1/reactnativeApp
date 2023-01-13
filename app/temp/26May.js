import { StyleSheet, Dimensions, Text, View, } from 'react-native';
import { useDimensions, useDeviceOrientation } from '@react-native-community/hooks'

export default function App() {
    console.log(useDeviceOrientation());
    const { landscape } = useDeviceOrientation();
    return (
        <View style={styles.container}>
            <View style={{
                backgroundColor: "tomato", width: "100%",
                height: landscape ? "100%" : "30%"
            }}></View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
});
