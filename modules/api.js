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

export async function createRequest(module, queryParams = ""){
    let url = apiLib[module.toLowerCase()] + queryParams;
    console.log(url)
    let request = await fetch(url);
    let responseText = await request.text();
    return JSON.parse(responseText);
}