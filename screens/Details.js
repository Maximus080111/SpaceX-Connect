import React, { useState, useEffect } from 'react';
import { Button, StyleSheet, Text, View, SafeAreaView } from 'react-native';

import * as Location from 'expo-location';
import MapView, { Marker, PROVIDER_GOOGLE} from 'react-native-maps';

import * as api from '../modules/api.js'
import Launchpad from "./Launchpad.js";
import Landpad from "./Landpad.js";
import LaunchScreen from './Launch.js';

import {createNativeStackNavigator} from "@react-navigation/native-stack";
import { FAB } from 'react-native-paper';

function MapViewRender({navigation}) {

	const [region, setRegion] = useState({
		latitude: 33.919434,
		longitude: -100.353996,
		latitudeDelta: 50,
		longitudeDelta: 50,
	});

	const [userLocation, setUserLocation] = useState({
		latitude: 33.919434,
		longitude: -100.353996,
		latitudeDelta: 50,
		longitudeDelta: 50,
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
			setUserLocation(locationFormat);
		})();
	}, []);

	useEffect(() => {
		(async () => {
			let response = await api.createRequest("launchpads");
			setLaunchPads(response);
		})();
	}, [])
	useEffect(() => {
		(async () => {
			let response = await api.createRequest("landpads");
			setLandPads(response);
		})();
	}, [])

	let [launchPads, setLaunchPads] = useState([])
	let [landPads, setLandPads] = useState([])

	let openLaunchpad = async (launchpad) => {
		let launchPadID = launchpad._targetInst.return.key;
		navigation.navigate("Launchpad", {
			"launchPadID": launchPadID
		});
	}
	let openLandpad = async (landpad) => {
		let landPadID = landpad._targetInst.return.key;
		navigation.navigate("Landpad", {
			"landPadID": landPadID
		});
	}

	let setToCurrentLocation = async () => {
		this.googleMap.animateToRegion(userLocation);
	}

	return (
		<SafeAreaView style={styles.container}>
			<MapView
				provider={PROVIDER_GOOGLE}
				style={styles.map}
				//specify our coordinates.
				region={region}
				ref={(gMap) => this.googleMap = gMap}
			>
				{launchPads[0] !== 0 && launchPads.map((marker) => {
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
				{landPads[0] !== 0 && landPads.map((marker) => {
					return (
						<Marker
							key={marker.id}
							coordinate={{
								latitude: marker.latitude,
								longitude: marker.longitude,
							}}
							title={marker.name}
							image={require('../imgs/landpad.png')}
							onPress={(marker) => {openLandpad(marker)}}
						/>
					);
				})
				}
				<Marker coordinate={{
					latitude: userLocation.latitude,
					longitude: userLocation.longitude,
				}}
				image={require('../imgs/user.png')}/>
			</MapView>
			<FAB
				icon="crosshairs-gps"
				onPress={() => setToCurrentLocation()}
				customSize={50}
				style={{
					position: 'absolute',
					margin: 5,
					left: 0,
					bottom: 0
				}}
			/>
		</SafeAreaView>
	)
}

export default function DetailsScreen({route, navigation}) {


	const Stack = createNativeStackNavigator();

	return (
		<Stack.Navigator>
			<Stack.Screen name="MapView" component={MapViewRender} options={{ headerShown: false }}/>
			<Stack.Screen name="Launchpad" component={Launchpad} options={{ headerShown: false}}/>
			<Stack.Screen name="Landpad" component={Landpad} options={{ headerShown: false }}/>
			<Stack.Screen name="Launchscreen" component={LaunchScreen} options={{ headerShown: false }}/>
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