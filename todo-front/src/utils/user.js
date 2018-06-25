import axios from 'axios';
import {BASE_URL} from "./config";

function login(email) {
    const params = {email: email};
    const url = BASE_URL + "user/login";

    return new Promise((resolve, reject) => {
        axios({
            method: 'POST',
            url,
            params
        }).then(({status, data}) => {
            if (status === 200) {
                resolve(data);
            } else {
                reject(new Error('error'));
            }
        });
    });
}

export default {
    login
};