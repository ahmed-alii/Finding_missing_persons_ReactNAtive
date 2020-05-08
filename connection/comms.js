import {saveData} from "./AsyncStorage";

// let baseURL = "http://localhost:5000/"
let baseURL = "http://192.168.10.5:5000/"

export function getReq(endpoint) {
    return fetch(baseURL + endpoint, {
        method: 'get',
    }).then(function (response) {
        return response.json();
    }).then(function (data) {
        return data;
    });
}

export function postReq(endpoint, payload) {
    return fetch(baseURL + endpoint, {
        method: 'post',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    }).then(function (response) {
        return response.json();
    }).then(function (data) {
        return data;
    });
}

export async function register(values) {
    return await postReq("registerVolunteer", values)
}

export async function login(values) {
    return await postReq("authorizeVolunteer", values)
}

export async function updateProfile(values) {
    return await postReq("updateVolunteer", values)
}

export async function saveRequest(values) {
    return await postReq("saveRequest", values)
}
export async function addVictim(values) {
    return await postReq("addVictim", values)
}
export async function searchVictim(values) {
    return await postReq("searchVictim", values)
}

export async function victimHistory() {
    return await getReq("getVictimsHistory")
}



