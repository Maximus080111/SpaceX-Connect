import React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';

export default function DetailsScreen({route, navigation}) {
    const {itemId, otherParam} = route.params;

	return (
		<View style={styles.container}>
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