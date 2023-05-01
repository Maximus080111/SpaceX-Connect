import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Button, ScrollView, ScrollViewBase, StyleSheet, Text, View, SafeAreaView, ImageBackground, Image } from 'react-native';
import Details from './screens/Details.js'
import Settings from './screens/Settings.js'

import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from '@expo/vector-icons/Ionicons.js';

const profile = {uri: 'https://reactjs.org/logo-og.png'};

function HomeScreen({ navigation }) {
	return (
		<SafeAreaView style={styles.container}>
			{/* this part is for the profile pictures and welcome text */}
			<View style={styles.profileBox}>
				<View style={styles.profile}>
					<Image style={styles.profile} source={profile}></Image>
				</View>
				<Text style={styles.welcome}>Welcome User</Text>
			</View>

			{/* This part is for the upcoming launch  */}
			<View>

			</View>
			<Text>Open up App.js to start working on your app!</Text>
			<Button
				title='Go to Details'
				onPress={() => navigation.navigate('Details', {
					itemId: 86,
					otherParam: 'anything you want here!!!!!',
				})}
			/>
			<StatusBar style="auto" />
		</SafeAreaView>
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
		alignItems: 'flex-start',
		justifyContent: 'center',
		paddingHorizontal: 20,
	},
	profileBox: {
		flex: 1, 
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'flex-end',
	},
	profile: {
		height: 80,
		width: 80,
		borderRadius: 50
	},
	welcome: {
		marginLeft: 30,
	}
});