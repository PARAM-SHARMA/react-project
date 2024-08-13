const express = require('express');
const connection = require('./config');
const router = express.Router();


router.get('/', function (req, res) {

    connection.query('SELECT * FROM task', function (err, result) {

        res.send(JSON.stringify(result));
    })
})

router.post('/', function (req, res) {
    let data = { task: req.body.name };
    console.log(data);
    connection.query(`INSERT INTO task(task) VALUES(?)`, data.task, function (err) {
        if (err) throw err;
    });
})

router.put('/', function (req, res) {
    let id = { task: req.body.id };
    let status = { task: req.body.status };
    connection.query(`UPDATE task SET status = ${status.task} WHERE id = "${id.task}"`, function (err) {
        if (err) throw err;
    });
})

module.exports = router;