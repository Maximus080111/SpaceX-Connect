import React, {useEffect, useState} from 'react';
import {Button, Image, ScrollView, StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {DataTable} from 'react-native-paper';
import * as api from '../modules/api.js';
import arrow from '../imgs/Back.png';

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
        <View style={{height: '100%', flex: 1,}}>
            <View style={{height: '50%', justifyContent: 'center', alignItems: 'center'}}>
                 <TouchableOpacity style={{position: 'absolute', left: 0, top: 0, padding: 30, zIndex: 2}} onPress={() => navigation.goBack()}>
                    <Image style={{position: 'relative', top: 40}} source={arrow} />
                </TouchableOpacity>
                <Image style={{position: 'absolute', height: '100%', width: '100%'}} source={{uri: response.images.large[0]}} resizeMode='cover'/>
                <View style={{width: '100%', height: '100%', position: 'absolute', backgroundColor: 'rgba(0, 0, 0, 0.35)'}}></View>
                <Text style={{fontWeight: 'bold', color: 'white', fontSize: 42}}>{response.name}</Text>
            </View>
            <View style={{height: '60%', padding: 20, backgroundColor: '#fff', width: '100%', position: 'absolute', bottom: 0, borderTopLeftRadius: 10, borderTopRightRadius: 10}}>
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
                            <DataTable.Cell textStyle={{fontWeight: 'bold'}}>Total landings:</DataTable.Cell>
                            <DataTable.Cell>{response.landing_attempts}</DataTable.Cell>
                        </DataTable.Row>
    			    </DataTable>
                </ScrollView>
            </View>
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
    data: {
		padding: 15,
	  },
});