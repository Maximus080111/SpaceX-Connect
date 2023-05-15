import AsyncStorage from '@react-native-async-storage/async-storage';

const apiLib = {
    capsules: "https://api.spacexdata.com/latest/capsules/",
    company_info: "https://api.spacexdata.com/latest/company/",
    cores: "https://api.spacexdata.com/latest/cores/",
    crew: "https://api.spacexdata.com/latest/crew/",
    dragons: "https://api.spacexdata.com/latest/dragons/",
    landpads: "https://api.spacexdata.com/latest/landpads/",
    launches: "https://api.spacexdata.com/latest/launches/",
    launchpads: "https://api.spacexdata.com/latest/launchpads/",
    payloads: "https://api.spacexdata.com/latest/payloads/",
    roadster: "https://api.spacexdata.com/latest/roadster/",
    rockets: "https://api.spacexdata.com/latest/rockets/",
    ships: "https://api.spacexdata.com/latest/ships/",
    starlink: "https://api.spacexdata.com/latest/starlink/"
}

export async function createRequest(module, queryParams = "", useLocal = true){
    let url = apiLib[module.toLowerCase()] + queryParams;
    let responseText = "[]";
    try {
        if(useLocal && await AsyncStorage.getItem(url) !== null && await AsyncStorage.getItem(url) !== ''){
            responseText = await AsyncStorage.getItem(url);
        } else{
            throw new Error("Not using local");
        }
    } catch (e){
        let request = await fetch(url);
        responseText = await request.text();
        await AsyncStorage.setItem(url, responseText);
    }
    return JSON.parse(responseText);
}

export async function clearCache(){
    await AsyncStorage.clear();
}