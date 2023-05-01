import React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';

export default function SettingsScreen({navigation}) {
	return (
	  <View style={styles.container}>
		<Text>SettingsScreen</Text>
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