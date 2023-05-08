import AsyncStorage from '@react-native-async-storage/async-storage';

const apiLib = {
    capsules: "https://api.spacexdata.com/v4/capsules/",
    company_info: "https://api.spacexdata.com/v4/company/",
    cores: "https://api.spacexdata.com/v4/cores/",
    crew: "https://api.spacexdata.com/v4/crew/",
    dragons: "https://api.spacexdata.com/v4/dragons/",
    landpads: "https://api.spacexdata.com/v4/landpads/",
    launches: "https://api.spacexdata.com/v4/launches/",
    launchpads: "https://api.spacexdata.com/v4/launchpads/",
    payloads: "https://api.spacexdata.com/v4/payloads/",
    roadster: "https://api.spacexdata.com/v4/roadster/",
    rockets: "https://api.spacexdata.com/v4/rockets/",
    ships: "https://api.spacexdata.com/v4/ships/",
    starlink: "https://api.spacexdata.com/v4/starlink/"
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