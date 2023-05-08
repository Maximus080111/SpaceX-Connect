import React, {useEffect, useState} from 'react';
import {Button, Image, StyleSheet, Text, View} from 'react-native';
import * as api from '../modules/api.js';

export default function LaunchpadScreen({navigation, route}) {
    const {launchPadID, otherParam} = route.params;

    let [response, setResponse] = useState({
        images: {
            large: [
                "https://google.com"
            ]
        }
    });

    useEffect(() => {
        (async () => {
            let result = await api.createRequest("launchpads", launchPadID)
            setResponse(result)
        })()
    },[]);

    return (
        <View style={styles.container}>
            <Image source={{uri: response.images.large[0]}} style={{width: '80%', height: '40%', borderRadius: 10}} resizeMode="contain"/>
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