
var express = require('express'),
    mongoose = require('mongoose'),
    bodyParser = require('body-parser'),
    Leaders = require('../models/leadership'),
    Verify = require('./verify'),
    leaderRouter = express.Router();
    leaderRouter.use(bodyParser.json);


leaderRouter.route('/')

    .get(Verify.verifyOrdinaryUser, function(req, res, next){
       Leaders.find({}, function (err, leaders) {
           if (err) throw err;
           res.json(leaders);
       })
    })

    .post(Verify.verifyAdmin, function(req, res, next){
        Leaders.create(req.body, function (err, leader) {
            if (err) throw err;
            console.log('Promotion is created');

            var id = leader._id;
            res.writeHead(200, {
                'Content-Type':'text-plain'
            });
            res.end('New leader with id ' + id + ' is created')
        })
    })

    .delete(Verify.verifyAdmin, function(req, res, next){
        Leaders.remove({}, function (err, resp) {
            if (err) throw err;
            res.json(resp);
        })
    });

leaderRouter.route('/:leaderId')

    .get(Verify.verifyOrdinaryUser, function(req, res, next){
        Leaders.findById(req.params.leaderId, function (err, leader) {
            if (err) throw err;
            res.json(leader);
        })
    })

    .put(Verify.verifyAdmin, function(req, res, next){
        Leaders.findByIdAndUpdate(req.params.leaderId, {
            $set : req.body
        }, {new : true}, function (err, leader) {
            if (err) throw err;
            res.json(leader);
        })
    })

    .delete(Verify.verifyAdmin, function(req, res, next){
       Leaders.findByIdAndRemove(req.params.leaderId, function (err, resp) {
           if (err) throw err;
           res.json(resp);
       })
    });

module.exports = leaderRouter;