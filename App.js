import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import Details from './screens/Details.js'

import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';

function HomeScreen({ navigation }) {
	return (
		<View style={styles.container}>
			<Text>Open up App.js to start working on your app!</Text>
			<Button
				title='Go to Details'
				onPress={() => navigation.navigate('Details', {
					itemId: 86,
					otherParam: 'anything you want here!!!!!',
				})}
			/>
			<StatusBar style="auto" />
		</View>
	);
}

const Tab = createBottomTabNavigator();

export default function App() {
		return (
			<NavigationContainer>
				<Tab.Navigator screenOptions={screenOptionStyle}>
        			<Tab.Screen name="Home" component={HomeScreen} />
					<Tab.Screen name="Details" component={Details}  initialParams={{ itemId: 42 }}/>
      			</Tab.Navigator>
			</NavigationContainer>
		);
}

const screenOptionStyle = {
	headerShown: false,
	tabBarStyle: {
		backgroundColor: '#000',
		height: 80,
		borderTopLeftRadius: 10,
		borderTopRightRadius: 10,
	},
	tabBarLabelStyle: {
		color: '#fff',
		paddingVertical: 5,
	}
}


const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center',
	},
});