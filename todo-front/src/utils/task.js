import axios from 'axios';
import {BASE_URL, KEY_USER_ID} from "./config";

function fetchTasks(userId) {

    const url = BASE_URL + "tasks/" + userId;

    return new Promise((resolve, reject) => {
        axios({
            method: 'GET',
            url
        }).then(({status, data}) => {
            if (status === 200) {
                resolve(data);
            } else {
                reject(new Error('error'));
            }
        });
    });
}

function addTask(params) {

    const url = BASE_URL + "task/store";

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
    fetchTasks,
    addTask
};