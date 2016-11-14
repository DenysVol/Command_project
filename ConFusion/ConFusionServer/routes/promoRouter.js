var express = require('express'),
    mongoose = require('mongoose'),
    Promotions = require('../models/promotions'),
    Verify = require('./verify');
var promoRouter = express.Router();

promoRouter.route('/')

    .get(Verify.verifyOrdinaryUser, function(req, res, next){
        Promotions.find({}, function (err, promotions) {
            if (err) throw err;
            res.json(promotions);
        })
    })

    .post(Verify.verifyAdmin, function(req, res, next){
       Promotions.create(req.body, function (err, promotion) {
           if (err) throw err;
           console.log('New promotion was created!');

           var id = promotion._id;

           res.writeHead(200, {
               'Content-Type':'text/plain'
           });

           res.end('New promotion with id ' + id + ' is created')
       })
    })

    .delete(Verify.verifyAdmin, function(req, res, next){
       Promotions.remove({}, function (err, resp) {
           if (err) throw err;

           res.json(resp);
       })
    });

promoRouter.route('/:promotionId')

    .get(Verify.verifyOrdinaryUser, function(req, res, next){
        Promotions.findById(req.params.promotionId, function (err, promotion) {
            if (err) throw err;
            res.json(promotion);
        })
    })

    .put(Verify.verifyAdmin, function(req, res, next){
        Promotions.findByIdAndUpdate(req.params.promotionId, {$set : req.body}, {new : true}, function (err, promotion) {
            if (err) throw err;
            res.json(promotion);
        })
    })

    .delete(Verify.verifyAdmin, function(req, res, next){
        Promotions.findByIdAndRemove(req.params.promotionId, function (err, resp) {
            if (err) throw err;
            res.json(resp);
        })
    });

module.exports = promoRouter;