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
        <ScrollView contentContainerStyle={{height: '100%'}}>
                <View style={{height: '40%', justifyContent: 'center', alignItems: 'center'}}>
                    <Text style={{position: 'absolute', fontWeight: 'bold', color: 'white', fontSize: 42}}>{response.name}</Text>
                    <View style={styles.overlay}></View>
                    <Image style={{width: '100%', height: '100%', zIndex: -2,}} source={{uri: response.images.large[0]}} resizeMode='cover' />
                </View>
                <ScrollView style={{paddingHorizontal: 20}}>
                    <Text style={{textAlign: 'center', marginVertical: 20, fontWeight: 'bold', fontSize: 18}}>{response.full_name}</Text>
                    <Text>{response.details}</Text>
                </ScrollView>
        </ScrollView>
            // {/* <ScrollView contentContainerStyle={{
            //     alignItems: "center",
            //     minWidth: "100%",
            //     paddingTop: 50,
            //     paddingBottom: 50
            // }}> */}
            //     {/* <Card style={{width: '80%'}}>
            //         <Card.Title title={response.name}/>
            //         <Card.Cover source={{uri: response.images.large[0]}} />
            //     </Card>
            //     <Card style={{width: '80%', marginTop: 20}}>
            //         <Card.Title title="Volledige naam"/>
            //         <Card.Content>
            //             <Text>{response.full_name}</Text>
            //         </Card.Content>
            //     </Card>
            //     <Card style={{width: '80%', marginTop: 20}}>
            //         <Card.Title title="Extra informatie"/>
            //         <Card.Content>
            //             <Text>{response.details}</Text>
            //         </Card.Content>
            //     </Card>
            //     <Card style={{width: '80%', marginTop: 20}}>
            //         <Card.Title title="Launches"/>
            //         <Card.Content>
                        // <ScrollView horizontal={true}>
                        //     {launches[0] !== 0 && launches[0].id !== "notfound" && launches[0].id !== "loadingitems" && launches.map((card) => {
                        //         return (
                        //             <Card key={card.id} style={{width: 200, marginRight: 20}}>
                        //                 <Card.Title title={card.name}/>
                        //                 <Card.Cover source={{uri: card.links.patch.small}}></Card.Cover>
                        //             </Card>
                        //         );
                        //     })
                        //     }
                        //     {launches.length === 1 && launches[0].id === "notfound" && launches.map((card) => {
                        //         return (
                        //             <Text key={card.id}>{card.name}</Text>
                        //         );
                        //     })
                        //     }
                        //     {launches.length === 1 && launches[0].id === "loadingitems" && launches.map((card) => {
                        //         return (
                        //             <ActivityIndicator key={card.id} size="small" color="#0000ff" />
                        //         );
                        //     })
                        //     }
                        // </ScrollView>
            //         </Card.Content>
            //     </Card> */}
            // {/* </ScrollView> */}
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    overlay: {
        width: '100%',
        height: '100%',
        position: 'absolute',
        backgroundColor: 'rgba(0, 0, 0, 0.3)',
        borderRadius: 5,
		zIndex: -1,
    }
});