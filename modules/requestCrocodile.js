import http from 'k6/http';
import { sleep, check } from "k6";
import { returnError } from "./errorHandler.js";

const requestUrl = 	"/public/crocodiles/"

export function requestAllCrocodiles(url){
    
    const response = http.get(url+requestUrl);
    
    let isChecked = check(response, {
        "Response code is 200": (res) => res.status == 200,
        "Test Passed '200 OK'": (res) => res.status_text == "200 OK",
        "Check existent Crocodiles": (res) => res.body.includes("Lyle the Crocodile")
    })

    returnError(response, isChecked);
    sleep(1);
}

export function requestSingleCrocodile(url, id){
    const response = http.get(url+requestUrl+id);
    // console.log(response.body)

    let isChecked = check(response, {
        "Response code is 200": (res) => res.status == 200,
        "Test Passed '200 OK'": (res) => res.status_text == "200 OK",
        "Check crocodile id": (res) => res.body.includes('"id":'+id)
    })

    returnError(response, isChecked);
    sleep(1);
}

export function requestNoExistentCrocodiles(url, id){
    
    const response = http.get(url+requestUrl+id);
    
    let isChecked = check(response, {
        "Response code is 404": (res) => res.status == 404,
        "Test Passed '404Not Found'": (res) => res.status_text == "404 Not Found",
        "Check no Found Crocodiles": (res) => res.body.includes('Not found.')
    })

    returnError(response, isChecked);
    sleep(1);
}