var express = require('express');
var router = express.Router();
var pool = require('../modules/pool');

router.get('/', function(req, res) {
    console.log('message get was hit!');
    pool.connect(function(ErrorConnecting, client, done) {
        if (ErrorConnecting) {
            console.log('Error connecting to database');
            res.sendStatus(500);
        } else {
            client.query('SELECT * FROM tasklist;', function(ErrorMakingTask, result) {
                done();
            })
            if (ErrorMakingTask) {
                console.log('Error making task', ErrorMakingTask);
                res.sendStatus(500);
            } else {
                res.send(result.rows)
            }
        }
    });
});

router.post('/', function(req, res) {
    pool.connect(function(ErrorConnecting, client, done) {
        done();
        if (ErrorConnecting) {
            console.log('error connecting to database', ErrorConnecting);
            res.sendStatus(500)
        } else {
            client.query('INSERT INTO tasklist (name, task) VALUES ($1, $2)', [req.body.name, req.body.task],
                function(ErrorMakingTask, result) {
                    if (ErrorMakingTask) {
                        console.log('Error making task', ErrorMakingTask);
                        res.sendStatus(500);
                    } else {
                        res.sendStatus(201);
                    }

                })
        }

    })
})
module.exports = router;