const express = require('express');
const connection = require('./config');
const router = express.Router();


router.get('/', function (req, res) {
    connection.query(`SELECT * FROM users`, (err, result) => {
        if(err) throw err;
        res.send(JSON.stringify(result));
    })
});

router.post('/signin', (req, res) => {
    let name = req.body.name;
    let email = req.body.email;
    let pass = req.body.pass;
    connection.query(`SELECT * FROM users where email = ? AND pass = ?`, [email, pass], (err, result) => {
        if(err) throw err;
        if(result[0]) {
            res.json('user already exists');
        }
        if(!result[0]) {
            connection.query(`INSERT INTO users(name, email, pass) values(?, ?, ?)`, [name, email, pass], (err) => {
                if(err) throw err;
                res.send('the user created')
            })
        }
    })
});

router.post('/', (req, res) => {
    let email = req.body.email;
    let pass = req.body.pass;
    connection.query(`SELECT * FROM users WHERE email = ? AND pass = ?`, [email, pass], (err, result) => {
        if(err) throw err;
        if(result[0]) {
            res.json({ message: "the user exist" });
        }
        else {
            res.json({ message: "the user does not exist" });
        }
    })
})


module.exports = router;