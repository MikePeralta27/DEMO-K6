import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";
import { group } from 'k6'; 
import { loginCrocodile } from "../modules/authCrocodile.js"
import { requestAllCrocodiles, requestSingleCrocodile, requestNoExistentCrocodiles } from "../modules/requestCrocodile.js";
import { textSummary } from "https://jslib.k6.io/k6-summary/0.0.1/index.js";


const baseUrl = "https://test-api.k6.io"
const username = "user"
const password = "test123!"
const id = 2
const noId = 10

export let options = {
    thresholds: {
        checks: ['rate>0.75'], 
        http_req_duration: ['p(75)<3000'],
    },
    scenarios: {
        crocodiles: {
            executor: "per-vu-iterations",
            vus: 20,
            iterations: 3,
            maxDuration: '50s',
        }
    },
};


export default () => {
    group("Login Test", () => {
        loginCrocodile(baseUrl, username, password);

    })

    group("Getting all existent crocodiles", () => {
        requestAllCrocodiles(baseUrl);
    })

    group("Getting a single crocodile", () => {
        requestSingleCrocodile(baseUrl, id);
    })

    group("Getting No extient crocodiles", () => {
        requestNoExistentCrocodiles(baseUrl, noId);
    })

}

export function handleSummary(data) {
    let summaryId = Date.now();
    return {
        [`reports/testSummary-${summaryId}.html`]: htmlReport(data),
        stdout: textSummary(data, { indent: " ", enableColors: true })
    };
}