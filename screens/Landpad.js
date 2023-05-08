import React, {useEffect, useState} from 'react';
import {Button, Image, ScrollView, StyleSheet, Text, View} from 'react-native';
import {Card} from 'react-native-paper';
import * as api from '../modules/api.js';

export default function Landpadscreen({navigation, route}) {
    const {landPadID, otherParam} = route.params;

    let [response, setResponse] = useState({
        images: {
            large: [
                "https://google.com"
            ]
        }
    });

    useEffect(() => {
        (async () => {
            let result = await api.createRequest("landpads", landPadID)
            setResponse(result)
        })()
    },[]);

    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={{
                alignItems: "center",
                minWidth: "100%",
                paddingTop: 50,
                paddingBottom: 50
            }}>
                <Card style={{width: '80%'}}>
                    <Card.Title title={response.name}/>
                    <Card.Cover source={{uri: response.images.large[0]}} />
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
            </ScrollView>
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