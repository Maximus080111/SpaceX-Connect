import React, {useEffect, useState} from 'react';
import { Button, StyleSheet, Text, View, TouchableOpacity, Image, ScrollView } from 'react-native';
import * as api from '../modules/api.js';
import arrow from '../imgs/Back.png';

export default function Rocket({navigation, route}) {

	const {rocketID} = route.params;

	let [response, setResponse] = useState({
		flickr_images: [
			"https://google.com"
		]
	});

	useEffect(() => {
        (async () => {
            let result = await api.createRequest("Rockets", rocketID)
            setResponse(result)
        })()
    },[]);

	return (
	//   <View style={styles.container}>
	// 	<Text>{response.name}</Text>
	// 	<Button title="Go to Home" onPress={() => navigation.navigate('Home')} />
	// 	<Button title="Go back" onPress={() => navigation.goBack()} />
	//   </View>

		<View style={{height: '100%', flex: 1,}}>
		<View style={{height: '60%', justifyContent: 'center', alignItems: 'center'}}>
			<TouchableOpacity style={{position: 'absolute', left: 0, top: 0, padding: 30, zIndex: 2}} onPress={() => navigation.goBack()}>
				<Image style={{position: 'relative', top: 40}} source={arrow} />
			</TouchableOpacity>
			<Image style={{position: 'absolute', height: '100%', width: '100%'}} source={{uri: response.flickr_images[0]}} resizeMode='cover'/>
			<View style={{width: '100%', height: '100%', position: 'absolute', backgroundColor: 'rgba(0, 0, 0, 0.35)'}}></View>
			<Text style={{fontWeight: 'bold', color: 'white', fontSize: 42}}>{response.name}</Text>
		</View>
		<View style={{height: '50%', padding: 20, backgroundColor: '#fff', width: '100%', position: 'absolute', bottom: 0, borderTopLeftRadius: 10, borderTopRightRadius: 10}}>
			<Text style={{textAlign: 'center', fontWeight: 'bold', fontSize: 18, marginBottom: 15}}>{response.name}</Text>
			<ScrollView>
				<Text>{response.description}</Text>
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
});