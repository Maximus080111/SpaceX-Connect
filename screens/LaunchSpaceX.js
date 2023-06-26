import React, {useEffect, useState} from 'react';
import {Button, Image, ScrollView, StyleSheet, Text, View, TouchableOpacity, Linking, Alert} from 'react-native';
import {DataTable} from 'react-native-paper';
import * as api from '../modules/api.js';
import arrow from '../imgs/Back.png';
import { Stack, FAB } from "@react-native-material/core";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";

export default function LaunchScreen({navigation, route}) {
    const {launchID, otherParam} = route.params;

    let [response, setResponse] = useState({
        imageDesktop: {
            url: "https://google.com"
        },
        paragraphs: []
    });

    let [count, setCount] = useState(0)

    useEffect(() => {
        (async () => {
            let result = await api.createRequest("LaunchSpaceX", launchID)
            setResponse(result)
        })()
    },[]);

    return (
        <View style={{height: '100%', flex: 1,width: '100%'}}>
            <View style={{height: '60%', justifyContent: 'center', alignItems: 'center'}}>
                 <TouchableOpacity style={{position: 'absolute', left: 0, top: 0, padding: 30, zIndex: 2}} onPress={() => navigation.goBack()}>
                    <Image style={{position: 'relative', top: 40}} source={arrow} />
                </TouchableOpacity>
                <Image style={{position: 'absolute', height: '100%', width: '100%'}} source={{uri: response.imageDesktop.url}} resizeMode='cover'/>
                <View style={{width: '100%', height: '100%', position: 'absolute', backgroundColor: 'rgba(0, 0, 0, 0.35)'}}></View>
                <Text style={{fontWeight: 'bold', color: 'white', fontSize: 42}}>{response.title}</Text>
            </View>
            <View style={{height: '50%', padding: 20, backgroundColor: '#fff', width: '100%', position: 'absolute', bottom: 0, borderTopLeftRadius: 10, borderTopRightRadius: 10}}>
                <Text style={{textAlign: 'center', fontWeight: 'bold', fontSize: 18, marginBottom: 15}}>{response.title}</Text>
                <ScrollView>
                    {response.paragraphs !== null && response.paragraphs.map((paragraphs) => {
                        var string = paragraphs.content;
                        var running = true;
                        while(running){
                            var firstOccurence = string.indexOf("(<a")
                            if(firstOccurence != -1){
                                var lastOccurence = string.indexOf("</a>)") + 6;
                                string = replaceRange(string, firstOccurence, lastOccurence, "");
                            }else {
                                var firstOccurence = string.indexOf("<a")
                                if(firstOccurence != -1){
                                    var lastOccurence = string.indexOf("</a>") + 5;
                                    string = replaceRange(string, firstOccurence, lastOccurence, "");
                                }else{
                                    running = false;
                                }
                            }
                        }
                        count++;
                        return (
                            <Text key={count.toString()}>{string}</Text>
                        );
                        })
                    }
                    <DataTable style={styles.data}>
                        <DataTable.Row>
                            <DataTable.Cell textStyle={{fontWeight: 'bold', width: '60%'}}>Status:</DataTable.Cell>
                            <DataTable.Cell>{String(response.status)}</DataTable.Cell>
                        </DataTable.Row>
                        <DataTable.Row>
                            <DataTable.Cell textStyle={{fontWeight: 'bold'}}>Flight number:</DataTable.Cell>
                            <DataTable.Cell>{response.missionId}</DataTable.Cell>
                        </DataTable.Row>
                        <DataTable.Row>
                            <DataTable.Cell textStyle={{fontWeight: 'bold'}}>Date:</DataTable.Cell>
                            <DataTable.Cell>{response.date}</DataTable.Cell>
                        </DataTable.Row>
    			    </DataTable>
                    <TouchableOpacity style={{backgroundColor: 'black', width: '60%', paddingVertical: 15, borderRadius: 10, alignSelf: 'center'}} onPress={()=>{openUrl("https://youtube.com/watch?v="+response.youtubeVideoId)}}>
                        <Text style={{color: 'white', textAlign: 'center'}}>Watch launch</Text>
                    </TouchableOpacity>
                </ScrollView>
            </View>
        </View>
    );
}

function replaceRange(s, start, end, substitute) {
    return s.substring(0, start) + substitute + s.substring(end);
}

async function openUrl(url) {
    const supported = await Linking.canOpenURL(url);
    if (supported) {
        await Linking.openURL(url);
    } else {
        Alert.alert(`Don't know how to open this URL: ${url}`);
    }
};

function randomString(length = 20){
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
        counter += 1;
    }
    return result;
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    data: {
		padding: 15,
	  },
});