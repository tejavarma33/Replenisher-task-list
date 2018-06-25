const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const {addTask, getTasks, updateTask, completeTask} = require('./controllers/task');
const {login} = require('./controllers/user');

const app = express();
const mongoDB = 'mongodb://rrudraraju:zxc40987@ds219051.mlab.com:19051/tasklist';

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use('/task', addTask);
app.use('/task', completeTask);
app.use('/task', updateTask);
app.use('/tasks', getTasks);
app.use('/user', login);

mongoose.connect(mongoDB);
mongoose.Promise = global.Promise;
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.listen(8000, () => console.log('Example app listening on port 8000!'));