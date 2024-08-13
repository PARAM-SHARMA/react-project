var express = require('express');
var router = express.Router();
const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'react_todo'
});

connection.connect(function (err) {
    if (err) {
        console.log('database not connected');
        throw err;
    }
    else {
        console.log('Database Connected');
    }
});
module.exports = connection;