import React from 'react';
import { Button, StyleSheet, Text, View, TouchableOpacity, Image, SafeAreaView, ScrollView } from 'react-native';
import * as api from '../modules/api';
import arrow from '../imgs/back-black.png';

export default function SettingsScreen({navigation}) {
	return (
	  <View style={styles.container}>
			<TouchableOpacity style={{position: 'absolute', left: 0, top: 0, padding: 30, zIndex: 2}} onPress={() => navigation.goBack()}>
				<Image style={{position: 'relative', top: 40}} source={arrow} />
			</TouchableOpacity>
			<Text style={{position: 'absolute', top: 70, fontWeight: 'bold', fontSize: 22}}>Settings</Text>
			<View style={{backgroundColor: 'lightgrey', width: '100%', padding: 10, borderRadius: 10}}>
				<Text style={{color: 'black', marginVertical: 5, fontWeight: 500, fontSize: 18}}>Cache</Text>
				<Button title="Clear local stored data" onPress={() =>api.clearCache()} />
			</View>
	  </View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center',
		paddingHorizontal: 20,
	},
});