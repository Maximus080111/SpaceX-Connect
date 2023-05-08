import React, {useEffect, useState} from 'react';
import {Button, Image, Pressable, ScrollView, StyleSheet, Text, View} from 'react-native';
import {ActivityIndicator, Card} from 'react-native-paper';
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

    let [launches, setLaunches] = useState([
        {
            id: "loadingitems",
            name: "Launches worden geladen",
            links: {
                patch: {
                    small: "https://google.com"
                }
            }
        }
    ]);
    useEffect(() => {
        (async () => {
            let result = await api.createRequest("launchpads", launchPadID)
            setResponse(result)
            let launches = [];
            for(let id in result.launches){
                let launch =  await api.createRequest("launches", result.launches[id]);
                launches.push(launch);
            }
            if(launches.length === 0){
                launches.push({
                    id: "notfound",
                    name: "No launches have taken place on this location",
                    links: {
                        patch: {
                            small: "https://google.com"
                        }
                    }
                })
            }
            setLaunches(launches);
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
                <Card style={{width: '80%', marginTop: 20}}>
                    <Card.Title title="Launches"/>
                    <Card.Content>
                        <ScrollView horizontal={true}>
                            {launches[0] !== 0 && launches[0].id !== "notfound" && launches[0].id !== "loadingitems" && launches.map((card) => {
                                return (
                                    <Card key={card.id} style={{width: 200, marginRight: 20}}>
                                        <Card.Title title={card.name}/>
                                        <Card.Cover source={{uri: card.links.patch.small}}></Card.Cover>
                                    </Card>
                                );
                            })
                            }
                            {launches.length === 1 && launches[0].id === "notfound" && launches.map((card) => {
                                return (
                                    <Text key={card.id}>{card.name}</Text>
                                );
                            })
                            }
                            {launches.length === 1 && launches[0].id === "loadingitems" && launches.map((card) => {
                                return (
                                    <ActivityIndicator key={card.id} size="small" color="#0000ff" />
                                );
                            })
                            }
                        </ScrollView>
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