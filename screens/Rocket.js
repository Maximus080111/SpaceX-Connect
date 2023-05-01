import React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';

export default function Rocket({navigation, route}) {
	return (
	  <View style={styles.container}>
		<Text>Rocket</Text>
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