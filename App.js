import { StatusBar } from 'expo-status-bar';
import React, {useCallback, useState} from 'react';
import { Button, Alert, Linking, Pressable, ScrollView, StyleSheet, Text, View, SafeAreaView, Image } from 'react-native';
import Details from './screens/Details.js'
import Settings from './screens/Settings.js'
import Card from './components/card.js'

import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from '@expo/vector-icons/Ionicons.js';
import Rocket from './screens/Rocket.js';

const profile = {uri: 'https://reactjs.org/logo-og.png'};

function HomeScreen({ navigation }) {

	let [cards, setCards] = useState([]);

	useEffect(() => {
        (async () => {
            let response = await api.createRequest("Rockets");
            setCards(response);
        })();
    }, [])

	return (
		<SafeAreaView style={styles.container}>
			{/* this part is for the profile pictures and welcome text */}
			<View style={styles.profileBox}>
				<Image style={styles.profile} source={profile}></Image>
				<Text style={styles.welcome}>Welcome User</Text>
			</View>

			{/* This part is for the upcoming launch  */}
			<View style={styles.upcomingLaunch}>
				<Image style={styles.launch_img}></Image>
				<View style={styles.view_launch}>
					<Text style={styles.launch_text_title}>FALCON 9 HEAVY</Text>
					<Text style={styles.launch_text_date}>2022-10-05</Text>
					<OpenURLButton url={supportedURL}>Watch Back</OpenURLButton>
				</View>
			</View>
			<View style={styles.scrollview}>
				<Text style={styles.RocketsTitle}>All rockets:</Text>
				<ScrollView horizontal={true}>
					{cards[0] !== 0 && cards.map((card) => {
						return (
								<Card onPress={(card) => navigation.navigate('Rocket', {RocketId: route.param.itemId})} />
							);
                		})
                	}
				</ScrollView>
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

const supportedURL = 'https://youtu.be/RfiQYRn7fBg';
const unsupportedURL = 'slack://open?team=123456';

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
		flexDirection: 'row',
		alignItems: 'center',
		paddingHorizontal: 10,
		width: '100%',
		backgroundColor: '#000',
		height: 120,
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
	}
});