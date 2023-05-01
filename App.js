import { StatusBar } from 'expo-status-bar';
import React, {useEffect, useState} from 'react';
import { Button, FlatList, ScrollView, StyleSheet, Text, View } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE} from 'react-native-maps';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

function HomeScreen({ navigation }) {
	return (
		<View style={styles.container}>
			<Text>Open up App.js to start working on your app!</Text>
			<Button
				title='Go to Details'
				onPress={() => navigation.navigate('Details', {
					itemId: 86,
					otherParam: 'anything you want here',
				})}
			/>
			<StatusBar style="auto" />
		</View>
	);
}

function DetailsScreen({route, navigation}) {

	const {itemId, otherParam} = route.params;

	return (
	  <View style={styles.container}>
		<Text>Details Screen</Text>
		<Text>itemId: {JSON.stringify(itemId)}</Text>
		<Text>otherParam: {JSON.stringify(otherParam)}</Text>
		<Button
			title="Go to Details... again"
			onPress={() =>
			navigation.push('Details', {
				itemId: Math.floor(Math.random() * 100),
			})
			}
		/>
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

const Tab = createBottomTabNavigator();

export default function App() {
		return (
			<NavigationContainer>
				<Tab.Navigator>
        			<Tab.Screen name="Home" component={HomeScreen} options={{title: 'HomeScreen'}} />
					<Tab.Screen name="Details" component={DetailsScreen}  initialParams={{ itemId: 42 }}/>
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
	map: {
		...StyleSheet.absoluteFillObject,
	},
});