import http from 'k6/http';
import { sleep, check } from "k6";
import { returnError } from "./errorHandler.js";

const loginUrl = "/auth/basic/login/";

export function loginCrocodile(url, username, password){

    const payload = JSON.stringify({
        "username": username,
        "password": password
    })

    const params = {
        headers: {
          'Content-Type': 'application/json',
        },
      };

    const response = http.post(url+loginUrl, payload, params);

    let isChecked = check(response, {
        "Response code is 200 OK": (res) => res.status == 200,
        "Test Passed '200 OK'": (res) => res.status_text == "200 OK",
        "Verify username email": (res) => res.body.includes("user@example.com")
    });

    returnError(response, isChecked);
    sleep(1);
}