import React, { useState, useEffect } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';

import * as Location from 'expo-location';
import MapView, { Marker, PROVIDER_GOOGLE} from 'react-native-maps';

import * as api from '../modules/api.js'
import Launchpad from "./Launchpad.js";

import {createNativeStackNavigator} from "@react-navigation/native-stack";

function MapViewRender({navigation}) {

	const [region, setRegion] = useState({
		latitude: 0,
		longitude: 0,
		latitudeDelta: 0.0922,
		longitudeDelta: 0.0421,
	});

	useEffect(() => {
		(async () => {
			let { status } = await Location.requestForegroundPermissionsAsync();
			if (status !== 'granted') {
				console.error('Permission to access location was denied');
				return;
			}

			let location = await Location.getCurrentPositionAsync({});

			let locationFormat = {};
			locationFormat.latitude = location.coords.latitude;
			locationFormat.longitude = location.coords.longitude;
			locationFormat.latitudeDelta = region.latitudeDelta;
			locationFormat.longitudeDelta = region.longitudeDelta;
			setRegion(locationFormat);
		})();
	}, []);

	useEffect(() => {
		(async () => {
			let response = await api.createRequest("launchpads");
			setMarkers(response);
		})();
	}, [])

	let [markers, setMarkers] = useState([])

	let openLaunchpad = async (launchpad) => {
		let launchPadID = launchpad._targetInst.return.key;
		navigation.navigate("Launchpad", {
			"launchPadID": launchPadID
		});
	}

	return (
		<View style={styles.container}>
			<MapView
				provider={PROVIDER_GOOGLE}
				style={styles.map}
				//specify our coordinates.
				region={{
					latitude: 33.919434,
					longitude: -118.353996,
					latitudeDelta: 0.0922,
					longitudeDelta: 0.0421,
				}}
				ref={(gMap) => this.googleMap = gMap}
			>
				{markers[0] !== 0 && markers.map((marker) => {
					return (
						<Marker
							key={marker.id}
							coordinate={{
								latitude: marker.latitude,
								longitude: marker.longitude,
							}}
							title={marker.name}
							image={require('../imgs/launchpad2.png')}
							onPress={(marker) => {openLaunchpad(marker)}}
						/>
					);
				})
				}
			</MapView>
		</View>
	)
}

export default function DetailsScreen({route, navigation}) {


	const Stack = createNativeStackNavigator();

	return (
		<Stack.Navigator>
			<Stack.Screen name="MapView" component={MapViewRender} options={{ headerShown: false }}/>
			<Stack.Screen name="Launchpad" component={Launchpad} options={{ headerShown: false }}/>
		</Stack.Navigator>
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