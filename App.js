import { StatusBar } from 'expo-status-bar';
import React, {useCallback, useState, useEffect} from 'react';
import {
	Button,
	Alert,
	Linking,
	Pressable,
	ScrollView,
	StyleSheet,
	Text,
	View,
	SafeAreaView,
	Image,
	TouchableOpacity
} from 'react-native';
import Details from './screens/Details.js'
import Settings from './screens/Settings.js'
import Card from './components/card.js'

import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from '@expo/vector-icons/Ionicons.js';
import Rocket from './screens/Rocket.js';
import * as api from './modules/api.js';

import {createNativeStackNavigator} from "@react-navigation/native-stack";
import Launchpad from "./screens/Launchpad";
import Landpad from "./screens/Landpad";
import LaunchScreen from './screens/Launch.js';
import LaunchSpaceXScreen from './screens/LaunchSpaceX.js';

import 'react-native-url-polyfill/auto';

const profile = {uri: 'https://reactjs.org/logo-og.png'};

function HomeScreenRender({ navigation }) {

	let [cards, setCards] = useState([]);

	let [nextlaunch, setNextLaunch] = useState([
		{
			links: {
				webcast: "https://youtu.be/pY628jRd6gM"
			}
		}
	]);

	let [launchpads, setLaunchpads] = useState([
		{
			images: {
				large: [
					"https://google.com"
				]
			}
		}
	]);

	let [landpads, setLandpads] = useState([
		{
			images: {
				large: [
					"https://google.com"
				]
			}
		}
	]);

	let [launches, setLaunches] = useState([]);

	useEffect(() => {
        (async () => {
            let rockets = await api.createRequest("Rockets");
			let launchpad = await api.createRequest("Launchpads");
			let landingpad = await api.createRequest("Landpads");
            setCards(rockets);
			setLaunchpads(launchpad);
			setLandpads(landingpad);
			let launches = await api.createRequest("launchesSpaceX");
			launches = launches.reverse();
			let next = await api.createRequest("LaunchSpaceX",new URLSearchParams(launches[0].link.split("?")[1]).get("missionId"));
			setNextLaunch(next);
			setLaunches(launches);
        })();
    }, [])


	let openRocket = async (rocketID) => {
		navigation.navigate("Rocket", {
			"rocketID": rocketID,	
		});
	}

	let openLaunchpad = async (launchPadID) => {
		navigation.navigate("Launchpad", {
			"launchPadID": launchPadID
		});
	}
	let openLandpad = async (landPadID) => {
		navigation.navigate("Landpad", {
			"landPadID": landPadID
		});
	}
	let openLaunch = async (launchID) => {
		navigation.navigate("LaunchSpaceX", {
			"launchID": launchID
		});
	}

	return (
		<SafeAreaView style={styles.container}>
			<ScrollView showsVerticalScrollIndicator={false}>
				{/* This part is for the upcoming launch  */}
				<View style={styles.upcomingLaunch}>
					{/* <Image style={styles.launch_img}></Image> */}
					<Text style={{color: 'white', fontWeight: '900', fontSize: 25}}>Latest Launch</Text>
					<View style={styles.view_launch}>
						<Text style={styles.launch_text_title}>{nextlaunch.title}</Text>
						{/* <Text style={styles.launch_text_date}>{nextlaunch.date_local}</Text> */}
						<Button onPress={() => {openUrl("https://youtube.com/watch?v="+nextlaunch.youtubeVideoId)}} title='watch back' />
					</View>
				</View>
				<View style={styles.scrollview}>
					<Text style={styles.RocketsTitle}>All rockets:</Text>
					<ScrollView horizontal={true} scroll>
						{cards[0] !== 0 && cards.map((card) => {
							return (
								<TouchableOpacity key={card.id} onPress={(event) => {openRocket(card.id)}}  style={styles.card}>
									<Text style={styles.text}>{card.name}</Text>
									<View style={styles.overlay}></View>
									<Image source={{uri: card.flickr_images[0]}} style={{width: '100%', height: '100%', borderRadius: 5,  position: 'absolute', zIndex: -2}} resizeMode='cover' />
										{/* <Button title="Go to Home" onPress={() => navigation.navigate('Home')} />
										<Button title="Go back" onPress={() => navigation.goBack()} /> */}
								</TouchableOpacity>
								);
							})
						}
					</ScrollView>
				</View>

				<View style={styles.scrollview}>
					<Text style={styles.RocketsTitle}>All launchpads:</Text>
					<ScrollView horizontal={true}>
						{launchpads[0] !== 0 && launchpads.map((launchpad) => {
							return (
								<TouchableOpacity key={launchpad.id} style={styles.card} onPress={(event) => {openLaunchpad(launchpad.id)}}>
									<Text style={styles.text}>{launchpad.name}</Text>
									<View style={styles.overlay}></View>
									<Image source={{uri: launchpad.images.large[0]}} style={{width: '100%', height: '100%', borderRadius: 5,  position: 'absolute', zIndex: -2}} resizeMode='cover' />
									{/* <Button title="Go to Home" onPress={() => navigation.navigate('Home')} />
										<Button title="Go back" onPress={() => navigation.goBack()} /> */}
								</TouchableOpacity>
							);
						})
						}
					</ScrollView>
				</View>
				
				<View style={styles.scrollview}>
					<Text style={styles.RocketsTitle}>All Landingpads:</Text>
				<ScrollView horizontal={true}>
					{landpads[0] !== 0 && landpads.map((landpads) => {
						return (
							<TouchableOpacity key={landpads.id} style={styles.card} onPress={(event) => {openLandpad(landpads.id)}}>
								<Text style={styles.text}>{landpads.name}</Text>
								<View style={styles.overlay}></View>
								<Image source={{uri: landpads.images.large[0]}} style={{width: '100%', height: '100%', borderRadius: 5,  position: 'absolute', zIndex: -2}} resizeMode='cover' />
								{/* <Button title="Go to Home" onPress={() => navigation.navigate('Home')} />
									<Button title="Go back" onPress={() => navigation.goBack()} /> */}
							</TouchableOpacity>
						);
					})
					}
				</ScrollView>
			</View>

			<View style={styles.scrollview}>
				<Text style={styles.RocketsTitle}>All launches:</Text>
				<ScrollView horizontal={true}>
					{launches[0] !== 0 && launches.map((launches) => {
						return (
							<TouchableOpacity key={launches.id} style={styles.card} onPress={(event) => {openLaunch(new URLSearchParams(launches.link.split("?")[1]).get("missionId"))}}>
								<Text style={styles.text}>{launches.title}</Text>
								<View style={styles.overlay}></View>
								<Image source={{uri: launches.imageDesktop.formats.small.url}} style={{width: '100%', height: '100%', borderRadius: 5,  position: 'absolute', zIndex: -2}} resizeMode='cover' />
								{/* <Button title="Go to Home" onPress={() => navigation.navigate('Home')} />
									<Button title="Go back" onPress={() => navigation.goBack()} /> */}
							</TouchableOpacity>
						);
					})
					}
				</ScrollView>
			</View>
			</ScrollView>
			{/* this part is for the profile pictures and welcome text */}
		</SafeAreaView>
	);
}

async function openUrl(url) {
    const supported = await Linking.canOpenURL(url);
    if (supported) {
        await Linking.openURL(url);
    } else {
        Alert.alert(`Don't know how to open this URL: ${url}`);
    }
};


const Tab = createBottomTabNavigator();

function HomeScreen() {
	const Stack = createNativeStackNavigator();

	return (
		<Stack.Navigator>
			<Stack.Screen name="App" component={HomeScreenRender} options={{ headerShown: false }}/>
			<Stack.Screen name="Rocket" component={Rocket} options={{ headerShown: false }}/>
			<Stack.Screen name="Launchpad" component={Launchpad} options={{ headerShown: false }}/>
			<Stack.Screen name="Landpad" component={Landpad} options={{ headerShown: false }}/>
			<Stack.Screen name="Launch" component={LaunchScreen} options={{ headerShown: false }}/>
			<Stack.Screen name="LaunchSpaceX" component={LaunchSpaceXScreen} options={{ headerShown: false }}/>
		</Stack.Navigator>
	);
}

export default function App(navigation, route) {

	const Stack = createNativeStackNavigator();

	return (
		<NavigationContainer>
			<Tab.Navigator initialRouteName='Map' screenOptions={({ route }) => ({
				tabBarIcon: ({ focused, color, size }) => {
					let iconName;

					if (route.name === 'Info') {
						iconName = focused ? 'list' : 'list-outline';
					} else if (route.name === 'Map') {
						iconName = focused ? 'map' : 'map-outline';
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
				<Tab.Screen name="Info" component={HomeScreen} />
				<Tab.Screen name="Map" component={Details} />
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
		marginVertical: 20,
	},
	profile: {
		height: 50,
		width: 50,
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
		marginTop: 20,
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
		backgroundColor: 'darkblue',
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
		textAlign: 'center',
		paddingHorizontal: 2,
    },
    overlay: {
        width: '100%',
        height: '100%',
        position: 'absolute',
        backgroundColor: 'rgba(0, 0, 0, 0.4)',
        borderRadius: 5,
		
    }
});