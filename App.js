import { StatusBar } from 'expo-status-bar';
import React, {useCallback, useState, useEffect} from 'react';
import { Button, Alert, Linking, Pressable, ScrollView, StyleSheet, Text, View, SafeAreaView, Image } from 'react-native';
import Details from './screens/Details.js'
import Settings from './screens/Settings.js'
import Card from './components/card.js'

import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from '@expo/vector-icons/Ionicons.js';
import Rocket from './screens/Rocket.js';
import * as api from './modules/api.js';

import {createNativeStackNavigator} from "@react-navigation/native-stack";

const profile = {uri: 'https://reactjs.org/logo-og.png'};

function HomeScreenRender({ navigation }) {

	let [cards, setCards] = useState([]);

	let [nextlaunch, setNextLaunch] = useState({});

	let [launchpads, setLaunchpads] = useState([
		{
			images: {
				large: [
					"https://google.com"
				]
			}
		}
	]);

	useEffect(() => {
        (async () => {
            let response = await api.createRequest("Rockets");
			let next = await api.createRequest("launches", "next");
			let launchpad = await api.createRequest("Launchpads")
            setCards(response);
			setNextLaunch(next);
			setLaunchpads(launchpad);
        })();
    }, [])


	let openRocket = async (rocket) => {
		let rocketID = rocket._targetInst.return.key;
		navigation.navigate("Rocket", {
			"rocketID": rocketID,	
		});
	}

	return (
		<SafeAreaView style={styles.container}>
			{/* this part is for the profile pictures and welcome text */}
			<View style={styles.profileBox}>
				<Image style={styles.profile} source={profile}></Image>
				<Text style={styles.welcome}>Welcome User</Text>
			</View>

			{/* This part is for the upcoming launch  */}
			<View style={styles.upcomingLaunch}>
				{/* <Image style={styles.launch_img}></Image> */}
				<Text style={{color: 'white', fontWeight: '900', fontSize: 22, marginBottom: 10}}>Latest Launch</Text>
				<View style={styles.view_launch}>
					<Text style={styles.launch_text_title}>{nextlaunch.name}</Text>
					<Text style={styles.launch_text_date}>{nextlaunch.date_local}</Text>
					<OpenURLButton>Watch Back</OpenURLButton>
				</View>
			</View>
			<View style={styles.scrollview}>
				<Text style={styles.RocketsTitle}>All rockets:</Text>
				<ScrollView horizontal={true}>
					{cards[0] !== 0 && cards.map((card) => {
						return (
							<Pressable key={card.id} onPress={(card) => {openRocket(card)}}  style={styles.card}>
								<Text style={styles.text}>{card.name}</Text>
								<View style={styles.overlay}></View>
								<Image source={{uri: card.flickr_images[0]}} style={{width: '100%', height: '100%', borderRadius: 5,  position: 'absolute', zIndex: -2}} resizeMode='cover' />
									{/* <Button title="Go to Home" onPress={() => navigation.navigate('Home')} />
									<Button title="Go back" onPress={() => navigation.goBack()} /> */}
							</Pressable>
							);
                		})
                	}
				</ScrollView>
			</View>

			<View style={styles.scrollview}>
				<Text style={styles.RocketsTitle}>All launchpads:</Text>
				<ScrollView horizontal={true}>
					{launchpads[0] !== 0 && launchpads.map((lanchpad) => {
						return (
							<Pressable key={lanchpad.id} style={styles.card}>
								<Text style={styles.text}>{lanchpad.name}</Text>
								<View style={styles.overlay}></View>
								<Image source={{uri: lanchpad.images.large[0]}} style={{width: '100%', height: '100%', borderRadius: 5,  position: 'absolute', zIndex: -2}} resizeMode='cover' />
								{/* <Button title="Go to Home" onPress={() => navigation.navigate('Home')} />
									<Button title="Go back" onPress={() => navigation.goBack()} /> */}
							</Pressable>
						);
					})
					}
				</ScrollView>
			</View>
		</SafeAreaView>
	);
}

const OpenURLButton = ({url, children}) => {
	const handlePress = useCallback(async () => {
		const supported = await Linking.canOpenURL(url);
		if(supported) {
			await Linking.openURL(url);
		} else {
			Alert.alert(`Don't know how to open this URL: ${url}`);
		}
	}, [url]);
	return <Pressable style={styles.watchBack} onPress={handlePress} ><Text style={styles.watchback_text}>{children}</Text></Pressable>;
}


const Tab = createBottomTabNavigator();

function HomeScreen() {
	const Stack = createNativeStackNavigator();

	return (
		<Stack.Navigator>
			<Stack.Screen name="App" component={HomeScreenRender} options={{ headerShown: false }}/>
			<Stack.Screen name="Rocket" component={Rocket} options={{ headerShown: false }}/>
		</Stack.Navigator>
	);
}

export default function App(navigation, route) {

	const Stack = createNativeStackNavigator();

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
		fontFamily: 'Roboto',
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'flex-start',
		justifyContent: 'space-evenly',
		paddingHorizontal: 20,
		paddingVertical: 30,
	},
	profileBox: {
		flexDirection: 'row',
		alignItems: 'center',
	},
	profile: {
		height: 80,
		width: 80,
		borderRadius: 50
	},
	welcome: {
		marginLeft: 30,
	},
	upcomingLaunch: {
		flexDirection: 'column',
		alignItems: 'center',
		justifyContent: 'center',
		paddingHorizontal: 10,
		width: '100%',
		backgroundColor: '#000',
		height: 150,
		borderRadius: 10,
	},
	launch_img: {
		backgroundColor: 'red',
		width: '40%',
		height: 100,
		borderRadius: 5,
	},
	launch_text_title: {
		color: 'white',
		fontWeight: 900
	},
	launch_text_date: {
		color: 'white',
		fontWeight: 700
	},
	view_launch: {
		paddingLeft: 10,
		alignItems: 'center',
	},
	watchBack: {
		marginTop: 5,
		backgroundColor: '#013766',
		paddingHorizontal: 15,
		paddingVertical: 8,
		borderRadius: 5,
		width: 100,
		textAlign: 'center',
	},
	watchback_text: {
		color: 'white',
		fontSize: 11,
	},
	scrollview: {
		height: 170,
	},
	RocketsTitle: {
		fontSize: 24,
		fontWeight: 800,
		marginBottom: 5,
	},
	card: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        height: 120,
        width: 120,
		backgroundColor: 'pink',
        marginRight: 10,
        borderRadius: 5,
	},
    background_img: {
        position: 'absolute',
        height: '100%',
        width:  '100%',
        borderRadius: 5,
        zIndex: -1,
    },
    text: {
        zIndex: 10,
		fontWeight: '800',
        color: 'white',
		fontSize: 18,
    },
    overlay: {
        width: '100%',
        height: '100%',
        position: 'absolute',
        backgroundColor: 'rgba(0, 0, 0, 0.4)',
        borderRadius: 5,
		
    }
});