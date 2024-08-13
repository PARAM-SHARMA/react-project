const express = require('express');
const connection = require('./config')
const router = express.Router();



router.get('/', (req, res) => {
    connection.query(`SELECT * FROM notes where notebookId = '' ORDER BY id DESC`, (err, result) => {
        if (err) throw err;
        res.json(result);
    })
})

router.post('/', (req, res) => {
    let title = req.body.title;
    let note = req.body.note;
    connection.query(`INSERT INTO notes(title, note) VALUES(?, ?)`, [title, note], (err) => {
        if (err) throw err;
    })
})

router.post('/editNote', (req, res) => {
    let id = req.body.id;
    let title = req.body.title;
    let note = req.body.note;
    if (id == null) {
        console.log("id is undefined");
    }
    else {
        connection.query(`UPDATE notes SET title = ?, note = ? WHERE id = ?`, [title, note, id], (err) => {
            if (err) throw err;

            res.json("the data has been saved")
            console.log("the data has been saved")
        })
    }
})

router.delete('/deleteNote', (req, res) => {
    let id = req.body.id;
    if(id == null) {
        console.log('id is undefined');
    }
    else {
        connection.query(`DELETE FROM notes WHERE id = ?`, [id], (err) => {
            if(err) throw err;
            res.json("the data has been erased")
            console.log("the data has been erased")
        })
    }
})

router.post('/createnotebook', (req, res) => {
    let title = req.body.title;
    connection.query(`INSERT INTO notebooks(title) VALUES(?)`, [title], (err) => {
        if (err) throw err;
    })
})

router.get('/fetchnotebooks', (req, res) => {
    connection.query(`SELECT * FROM notebooks ORDER BY id DESC`, (err, result) => {
        if(err) throw err;
        res.json(result);
    })
})

router.get('/notes/:id', (req, res) => {
    // running two times
    let id = req.params.id;
    // console.log('h');
    connection.query(`SELECT * FROM notes WHERE notebookId = '${id}' ORDER BY id DESC`, (err, result) => {
        if(err) throw err;
        res.json(result);
    })
})

router.post('/notebooknotes', (req, res) => {
    let title = req.body.title;
    let note = req.body.note;
    let id = req.body.id;
    connection.query(`INSERT INTO notes(title, note, notebookId) VALUES(?, ?, ?)`, [title, note, id], (err) => {
        if (err) throw err;
    })
})


module.exports = router;