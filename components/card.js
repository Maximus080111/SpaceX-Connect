import React from 'react';
import { Button, StyleSheet, Text, View, Image, Pressable } from 'react-native';
import Rocket from '../screens/Rocket';
import {createNativeStackNavigator} from "@react-navigation/native-stack";

const image = {uri: 'https://reactjs.org/logo-og.png'}

export default function Card({navigation}) {
	return (
        <Pressable style={styles.card}>
        <Text style={styles.text}>{card.name}</Text>
            <View style={styles.overlay}></View>
            <Image source={image} style={styles.background_img} />
                {/* <Button title="Go to Home" onPress={() => navigation.navigate('Home')} />
                <Button title="Go back" onPress={() => navigation.goBack()} /> */}
            </Pressable>
	);   
}

const styles = StyleSheet.create({
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
        color: 'white',
    },
    overlay: {
        width: '100%',
        height: '100%',
        position: 'absolute',
        backgroundColor: 'rgba(0, 0, 0, 0.65)',
        borderRadius: 5,
    }
});