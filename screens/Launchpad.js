import React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import * as api from '../modules/api.js';

export default function LaunchpadScreen({navigation, route}) {
    const {launchPadID, otherParam} = route.params;
    (async () => {
        let response = await api.createRequest("launchpads", launchPadID)
        console.log(response)
    })()
    return (
        <View style={styles.container}>
            <Text>SettingsScreen2</Text>
            <Button title="Go to Home" onPress={() => navigation.navigate('Home')} />
            <Button title="Go back" onPress={() => navigation.goBack()} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});