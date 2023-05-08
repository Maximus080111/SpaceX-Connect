import React, {useEffect, useState} from 'react';
import {Button, Image, ScrollView, StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {Card} from 'react-native-paper';
import * as api from '../modules/api.js';
import arrow from '../imgs/Back.png';

export default function LaunchScreen({navigation, route}) {
    const {launchID, otherParam} = route.params;

    let [response, setResponse] = useState({
        links: {
            patch: {
                large: "https://google.com"
            }
        }
    });

    useEffect(() => {
        (async () => {
            let result = await api.createRequest("Launches", launchID)
            setResponse(result)
        })()
    },[]);

    return (
        <View style={{height: '100%', flex: 1,}}>
            <View style={{height: '60%', justifyContent: 'center', alignItems: 'center'}}>
                 <TouchableOpacity style={{position: 'absolute', left: 0, top: 0, padding: 30, zIndex: 2}} onPress={() => navigation.goBack()}>
                    <Image style={{position: 'relative', top: 40}} source={arrow} />
                </TouchableOpacity>
                <Image style={{position: 'absolute', height: '100%', width: '100%'}} source={{uri: response.links.patch.large}} resizeMode='cover'/>
                <View style={{width: '100%', height: '100%', position: 'absolute', backgroundColor: 'rgba(0, 0, 0, 0.35)'}}></View>
                <Text style={{fontWeight: 'bold', color: 'white', fontSize: 42}}>{response.name}</Text>
            </View>
            <View style={{height: '50%', padding: 20, backgroundColor: '#fff', width: '100%', position: 'absolute', bottom: 0, borderTopLeftRadius: 10, borderTopRightRadius: 10}}>
                <Text style={{textAlign: 'center', fontWeight: 'bold', fontSize: 18, marginBottom: 15}}>{response.name}</Text>
                <ScrollView>
                    <Text>{response.details}</Text>
                    <Text>Date:</Text>
                    <Text>{response.date_local}</Text>
                </ScrollView>
            </View>
        </View>





        // <View style={styles.container}>
        //     <ScrollView contentContainerStyle={{
        //         alignItems: "center",
        //         minWidth: "100%",
        //         paddingTop: 50,
        //         paddingBottom: 50
        //     }}>
        //         <Card style={{width: '80%'}}>
        //             <Card.Title title={response.name}/>
        //             <Card.Cover source={{uri: response.images.large[0]}} />
        //         </Card>
        //         <Card style={{width: '80%', marginTop: 20}}>
        //             <Card.Title title="Volledige naam"/>
        //             <Card.Content>
        //                 <Text>{response.full_name}</Text>
        //             </Card.Content>
        //         </Card>
        //         <Card style={{width: '80%', marginTop: 20}}>
        //             <Card.Title title="Extra informatie"/>
        //             <Card.Content>
        //                 <Text>{response.details}</Text>
        //             </Card.Content>
        //         </Card>
        //     </ScrollView>
        // </View>
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