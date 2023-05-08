import React, {useEffect, useState} from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import * as api from '../modules/api.js';

export default function Rocket({navigation, route}) {

	const {rocketID} = route.params;

	let [response, setResponse] = useState({});

	useEffect(() => {
        (async () => {
            let result = await api.createRequest("Rockets", rocketID)
            setResponse(result)
        })()
    },[]);

	return (
	  <View style={styles.container}>
		<Text>{response.name}</Text>
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