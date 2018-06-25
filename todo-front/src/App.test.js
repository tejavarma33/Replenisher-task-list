import React from 'react';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import User from './utils/user';
import Task from './utils/task';
import { BASE_URL } from "./utils/config";

test('Login', () => {
    it('check login is valid or not', done => {
        let mock = new MockAdapter(axios);
        const data = { id: "abcdefghij", email: "test@test.com" };
        mock.onPost(BASE_URL + "user/login", { params: { email: "test@test.com" } }).reply(200, data);

        User.login('test@test.com').then(response => {
            console.log(response);
            expect(response).toEqual(data);
            done();
        });
    });
}, 20000);

test('Tasks', () => {
    it('fetch all tasks', done => {
        let mock = new MockAdapter(axios);
        let userId = "abcdefghij";
        let data = {
            tasks: [
                {
                    "_id": "5b2d5a67029f7a44c8b42d6e",
                    "complete": 1,
                    "title": "Task Form 1 ",
                    "description": "xfgdfgdfg",
                    "priority": "High",
                    "status": "In Progress",
                    "end_date": "2018-06-28T00:00:00.000Z",
                    "user_id": "abcdefghij",
                    "updated": "2018-06-23T02:21:57.848Z",
                    "created": "2018-06-23T02:21:57.848Z"
                }
            ]
        };
        mock.onGet(BASE_URL + "tasks/abcdefghij").reply(200, data);

        Task.fetchTasks(userId).then(response => {
            console.log(response);
            expect(response).toEqual(data);
            done();
        });
    });
    it('add task', done => {
        let mock = new MockAdapter(axios);
        let userId = "abcdefghij";
        let task = {
            "title": "Task Form 2",
            "description": "abhijik",
            "priority": "High",
            "status": "In Progress",
            "end_date": "2018-06-28T00:00:00.000Z",
            "user_id": "5b2d5a67029f7a44c8b42d6e",
            "repeat" :true
        };

        let data = [{
            "_id": "5b2d5a67029f7a44c8b42d6e",
            "complete": 1,
            "title": "Task Form 1 ",
            "description": "xfgdfgdfg",
            "priority": "High",
            "status": "In Progress",
            "end_date": "2018-06-28T00:00:00.000Z",
            "user_id": "abcdefghij",
            "updated": "2018-06-23T02:21:57.848Z",
            "created": "2018-06-23T02:21:57.848Z"
        },{
            "_id": "5b2d5a67029f7a44c8b42d6e",
            "complete": 1,
            "title": "Task Form 1 ",
            "description": "xfgdfgdfg",
            "priority": "High",
            "status": "In Progress",
            "end_date": "2018-07-02T00:00:00.000Z",
            "user_id": "abcdefghij",
            "updated": "2018-06-23T02:21:57.848Z",
            "created": "2018-06-23T02:21:57.848Z"
        }
    ];
        mock.onGet(BASE_URL + "tasks/abcdefghij").reply(200, data);

        Task.addTask(task).then(response => {
            console.log(response);
            expect(response).toEqual(data);
            done();
        });
    });

}, 20000);