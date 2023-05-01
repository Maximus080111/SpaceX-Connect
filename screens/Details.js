import React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';

export default function DetailsScreen({route, navigation}) {
    const {itemId, otherParam} = route.params;

	return (
	  <View style={styles.container}>
		<Text>Details Screen</Text>
		<Text>itemId: {JSON.stringify(itemId)}</Text>
		<Text>otherParam: {JSON.stringify(otherParam)}</Text>
		<Button title="Go to Home" onPress={() => navigation.navigate('Home')} />
		<Button title="Go back" onPress={() => navigation.goBack()} />
		{/* <MapView
					provider={PROVIDER_GOOGLE}
					style={styles.map}
					//specify our coordinates.
					initialRegion={{
						latitude: 28.485833,
						longitude: -80.544444,
						latitudeDelta: 0.0922,
						longitudeDelta: 0.0421,
					}}
				>
					<Marker
						coordinate={{
							latitude:  28.485833,
							longitude: -80.544444,
						}}
						title={'test'}
					/>
				</MapView> */}
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