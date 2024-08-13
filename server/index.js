const express = require('express');
const app = express();
const mysql = require('mysql');
const path = require('path');
const router = express.Router();
const bodyParser = require('body-parser');
const cors = require('cors');

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cors());
module.exports.bodyParser;

// Routes
const indexRouter = require('./Routes/auth');
const notebookRouter = require('./Routes/notebook');
const todoistRouter = require('./Routes/todoist');

// Urls
app.use('/', indexRouter);
app.use('/notebook', notebookRouter);
app.use('/todoist', todoistRouter);

// Listen Server
app.listen(3001, () => {
    console.log('listening to 3001');
})

module.exports = app;