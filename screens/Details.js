import React, { useState, useEffect } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';

import * as Location from 'expo-location';
import MapView, { Marker, PROVIDER_GOOGLE} from 'react-native-maps';

import * as api from '../modules/api.js'

export default function DetailsScreen({route, navigation}) {
	const {itemId, otherParam} = route.params;

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
			this.googleMap.animateToRegion(locationFormat)
		})();
	}, []);

	return (
		<View style={styles.container}>
			<Text>Details Screen</Text>
			<Text>itemId: {JSON.stringify(itemId)}</Text>
			<Text>otherParam: {JSON.stringify(otherParam)}</Text>
			<MapView
				provider={PROVIDER_GOOGLE}
				style={styles.map}
				//specify our coordinates.
				region={region}
				ref={(gMap) => this.googleMap = gMap}
			>
				<Marker
					coordinate={region}
					title={'test'}
				/>
			</MapView>
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