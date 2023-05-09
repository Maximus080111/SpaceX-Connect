import React, {useEffect, useState} from 'react';
import {Button, Image, Pressable, ScrollView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {ActivityIndicator, DataTable} from 'react-native-paper';
import * as api from '../modules/api.js';
import arrow from '../imgs/Back.png';

export default function LaunchpadScreen({navigation, route}) {
    const {launchPadID, otherParam} = route.params;

    let [response, setResponse] = useState({
        images: {
            large: [
                "https://google.com"
            ]
        },
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

    let openLaunch = async (launchID) => {
        navigation.navigate("Launchscreen", {
            "launchID": launchID
        });
    }

    return (
        <View style={{height: '100%', flex: 1,}}>
            <View style={{height: '55%', justifyContent: 'center', alignItems: 'center'}}>
                 <TouchableOpacity style={{position: 'absolute', left: 0, top: 0, padding: 30, zIndex: 2}} onPress={() => navigation.goBack()}>
                    <Image style={{position: 'relative', top: 40}} source={arrow} />
                </TouchableOpacity>
                <Image style={{position: 'absolute', height: '100%', width: '100%'}} source={{uri: response.images.large[0]}} resizeMode='cover'/>
                <View style={{width: '100%', height: '100%', position: 'absolute', backgroundColor: 'rgba(0, 0, 0, 0.35)'}}></View>
                <Text style={{fontWeight: 'bold', color: 'white', fontSize: 42}}>{response.name}</Text>
            </View>
            <View style={{height: '55%', padding: 20, backgroundColor: '#fff', width: '100%', position: 'absolute', bottom: 0, borderTopLeftRadius: 10, borderTopRightRadius: 10}}>
                <Text style={{textAlign: 'center', fontWeight: 'bold', fontSize: 18, marginBottom: 15}}>{response.full_name}</Text>
                <ScrollView>
                    <Text>{response.details}</Text>
                    <DataTable style={styles.data}>
                        <DataTable.Row>
                            <DataTable.Cell textStyle={{fontWeight: 'bold', width: '60%'}}>Region:</DataTable.Cell>
                            <DataTable.Cell>{response.region}</DataTable.Cell>
                        </DataTable.Row>
                        <DataTable.Row>
                            <DataTable.Cell textStyle={{fontWeight: 'bold'}}>Status:</DataTable.Cell>
                            <DataTable.Cell textStyle={{width: 200}}>{response.status}</DataTable.Cell>
                        </DataTable.Row>
                        <DataTable.Row>
                            <DataTable.Cell textStyle={{fontWeight: 'bold'}}>Total launches:</DataTable.Cell>
                            <DataTable.Cell>{response.launch_attempts}</DataTable.Cell>
                        </DataTable.Row>
    			    </DataTable>
                    <ScrollView contentContainerStyle={{marginVertical: 20}} horizontal={true}>
                            {launches[0] !== 0 && launches[0].id !== "notfound" && launches[0].id !== "loadingitems" && launches.map((card) => {
                                return (
                                    <TouchableOpacity
                                        key={card.id} style={{flex: 1,alignItems: 'center',justifyContent: 'center',height: 120,width: 120,borderRadius: 5,marginRight: 10,backgroundColor: 'darkblue'}} onPress={(event) => {openLaunch(card.id)}}>
                                        <Text style={{zIndex: 2, fontWeight: '800', color: 'white', fontSize: 14, textAlign: 'center'}}>{card.name}</Text>
                                        <View style={{width: '100%', height: '100%', position: 'absolute', backgroundColor: 'rgba(0, 0, 0, 0.3)', zIndex: -1, borderRadius: 5}}></View>
                                        <Image style={{position: 'absolute', height: '100%', width: '100%', borderRadius: 5, zIndex: -2}} source={{uri: card.links.patch.small}} />
                                    </TouchableOpacity>
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
                                    <ActivityIndicator key={card.id} size="small" color="#000000" />
                                );
                            })
                            }
                        </ScrollView>
                </ScrollView>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    data: {
		padding: 15,
	  },
});