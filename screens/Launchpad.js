import React, {useEffect, useState} from 'react';
import {Button, Image, StyleSheet, Text, View} from 'react-native';
import {Card} from 'react-native-paper';
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
            <Card style={{width: '80%'}}>
                <Card.Title title={response.name}/>
                <Card.Cover source={{uri: response.images.large[0]}} />
                {/*<Card.Content>*/}
                {/*    <Text>Volledige naam: {response.full_name}</Text>*/}
                {/*</Card.Content>*/}
                {/*<Image source={{uri: response.images.large[0]}} style={{width: '80%', height: '35%',borderRadius: 10}} resizeMode="cover"/>*/}
                {/*<Text>{response.name}</Text>*/}
                {/*<Text>{response.full_name}</Text>*/}
                {/*<Text>{response.details}</Text>*/}
                {/*<Button title="Go to Home" onPress={() => navigation.navigate('Home')} />*/}
                {/*<Button title="Go back" onPress={() => navigation.goBack()} />*/}
            </Card>
            <Card style={{width: '80%', marginTop: 20}}>
                <Card.Title title="Volledige naam"/>
                <Card.Content>
                    <Text>{response.full_name}</Text>
                </Card.Content>
            </Card>
            <Card style={{width: '80%', marginTop: 20}}>
                <Card.Title title="Extra informatie"/>
                <Card.Content>
                    <Text>{response.details}</Text>
                </Card.Content>
            </Card>
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