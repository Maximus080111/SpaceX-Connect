import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import Details from './screens/Details.js'
import Settings from './screens/Settings.js'

import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from '@expo/vector-icons/Ionicons.js';

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
				<Tab.Navigator screenOptions={({ route }) => ({
						tabBarIcon: ({ focused, color, size }) => {
							let iconName;

							if (route.name === 'Home') {
								iconName = focused ? 'rocket' : 'rocket-outline';
							} else if (route.name === 'Details') {
								iconName = focused ? 'information-circle' : 'information-circle-outline';
							} else if (route.name === 'Settings') {
								iconName = focused ? 'settings' : 'settings-outline';
							}

							// You can return any component that you like here!
							return <Ionicons name={iconName} size={size} color={color} />;
						},
						tabBarActiveTintColor: 'white',
						tabBarInactiveTintColor: 'gray',
						headerShown: false,
						tabBarStyle: {
							backgroundColor: '#000',
							height: 80,
							paddingHorizontal: 15,
							borderTopLeftRadius: 15,
							borderTopRightRadius: 15,
						},
						tabBarLabelStyle: {
							color: '#fff',
							paddingVertical: 5,
						}
					})}>
					<Tab.Screen name="Details" component={Details}  initialParams={{ itemId: 42 }}/>
					<Tab.Screen name="Home" component={HomeScreen} />
					<Tab.Screen name="Settings" component={Settings} />
      			</Tab.Navigator>
			</NavigationContainer>
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