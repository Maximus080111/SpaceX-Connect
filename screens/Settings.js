import React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import * as api from '../modules/api';

export default function SettingsScreen({navigation}) {
	return (
	  <View style={styles.container}>
		<Text>SettingsScreen</Text>
		<Button title="Go to Home" onPress={() => navigation.navigate('Home')} />
		<Button title="Go back" onPress={() => navigation.goBack()} />
		<Button title="Clear local stored data" onPress={() =>api.clearCache()} />
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