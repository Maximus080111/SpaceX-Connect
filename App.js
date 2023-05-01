import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import * as Location from 'expo-location';

export default function App() {
	const [location, setLocation] = useState(null);
	const [errorMsg, setErrorMsg] = useState(null);

	useEffect(() => {
		(async () => {

			let { status } = await Location.requestForegroundPermissionsAsync();
			if (status !== 'granted') {
				setErrorMsg('Permission to access location was denied');
				return;
			}

			let location = await Location.getCurrentPositionAsync({});
			setLocation(location);
		})();
	}, []);

	let text = 'Waiting..';
	if (errorMsg) {
		text = errorMsg;
	} else if (location) {
		text = JSON.stringify(location);
	}

	return (
		<View style={styles.container}>
			<Text>Open up App.js to start working on your app!</Text>
			<Text></Text>
			<StatusBar style="auto" />
			{/*<MapView*/}
			{/*	provider={PROVIDER_GOOGLE}*/}
			{/*	style={styles.map}*/}
			{/*	//specify our coordinates.*/}
			{/*	initialRegion={{*/}
			{/*		latitude: 37.78825,*/}
			{/*		longitude: -122.4324,*/}
			{/*		latitudeDelta: 0.0922,*/}
			{/*		longitudeDelta: 0.0421,*/}
			{/*	}}*/}
			{/*>*/}
			{/*	<Marker*/}
			{/*		coordinate={{*/}
			{/*			latitude: 26.891026,*/}
			{/*			longitude: 75.793822,*/}
			{/*		}}*/}
			{/*		title={'test'}*/}
			{/*	/>*/}
			{/*</MapView>*/}
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
	map: {
		...StyleSheet.absoluteFillObject,
	},
});