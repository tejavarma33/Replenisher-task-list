const express = require('express');
const {check, validationResult} = require('express-validator/check');
const Task = require("../models/task");
const moment = require('moment');

const router = express.Router();

// add task
const addTask = router.post("/store", (req, res) => {
    let task = new Task(req.body);
    task.save((error) => {
        let response = {};
        response.meta = {};
        if (task.repeat) {
            console.log("Task is repeated");
            let currDate = moment();
            let dueDate = moment(req.body.end_date);
            let newDate = dueDate.add(dueDate.diff(currDate, 'days'), 'days');
            console.log("Days Diff", dueDate.diff(currDate, 'days'), newDate);
            let repeatTask = new Task({
                title: req.body.title,
                description: req.body.description,
                priority: req.body.priority,
                status: req.body.status,
                user_id: req.body.user_id,
                end_date: newDate,
            });
            repeatTask.save((error) => {
                if (error) {
                    response.meta.status = "fail";
                    response.meta.message = "database validation error";
                    return res.status(422).send(response)
                }
                response.data = {};
                response.meta.status = "success";
                response.meta.message = "Task add successfully";
                response.data.tasks = [task, repeatTask];
                return res.status(200).send(response);
            });
        } else {
            if (error) {
                response.meta.status = "fail";
                response.meta.message = "database validation error";
                return res.status(422).send(response)
            }
            response.data = {};
            response.meta.status = "success";
            response.meta.message = "Task add successfully";
            response.data.tasks = [task];
            return res.status(200).send(response);
        }
    });
});

// add task
const updateTask = router.post("/update", (req, res) => {
    console.log(req.body);
    Task.findOneAndUpdate({_id: req.body.id, user_id: req.body.user_id}, {
        title: req.body.title,
        description: req.body.description,
        priority: req.body.priority,
        status: req.body.status,
        repeat: req.body.repeat,
        end_date: req.body.end_date
    }, {new: true, returnOriginal: false}, (error, task) => {
        let response = {};
        response.meta = {};
        if (error) {
            response.meta.status = "fail";
            response.meta.message = "database validation error";
            return res.status(422).send(response)
        }
        response.data = {};
        response.meta.status = "success";
        response.meta.message = "Task updated successfully";
        response.data.tasks = [task];
        return res.status(200).send(response);
    });
});

const completeTask = router.post("/complete/:id", (req, res) => {
    console.log(req.body);
    Task.findOneAndUpdate({_id: req.params.id}, {
        complete: 1
    }, (error, task) => {
        console.log("error ", error);
        let response = {};
        response.meta = {};
        if (error) {
            response.meta.status = "fail";
            response.meta.message = "database validation error";
            return res.status(422).send(response)
        }
        response.data = {};
        response.meta.status = "success";
        response.meta.message = "Task completed successfully";
        response.data.task = task;
        return res.status(200).send(response);
    });
});

// add task
const getTasks = router.get("/:user_id", (req, res) => {
    Task.find({user_id: req.params.user_id, complete: 0}, function (err, tasks) {
        /*let taskMap = {};
        tasks.forEach(function(user) {
            userMap[user._id] = user;
        });
        res.send(userMap);*/
        let response = {};
        response.meta = {};
        if (err) {
            response.meta.status = "fail";
            response.meta.message = "database validation error";
            return res.status(422).send(response)
        }
        response.data = {};
        response.meta.status = "success";
        response.meta.message = "Task fetched successfully";
        response.data.tasks = tasks;
        return res.status(200).send(response);
    });
});

// get Tasks

module.exports = {addTask, getTasks, updateTask, completeTask};
