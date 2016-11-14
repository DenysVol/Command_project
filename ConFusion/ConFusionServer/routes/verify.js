var User = require('../models/user'),
    jwt = require('jsonwebtoken'),
    config = require('../config');

exports.getToken = function (user) {
    return jwt.sign(user, config.secretKey, {
        expiresIn: 3600
    })
};

exports.verifyOrdinaryUser = function (req, res, next) {
    // check header, url param or post param for token
  var token = req.body.token || req.query.token ||req.headers['x-access-token'];

    // decode token

    if(token){
        jwt.verify(token, config.secretKey, function (err, decoded) {
            if (err){
                var err = new Error('You are not authenticated');
                err.status = 401;
                next(err);
            }
            res.decoded = decoded;
            next();
        })
    }
    else {
        var err = new Error('No token provided!');
        err.status = 403;
        next(err)
    }
};

exports.verifyAdmin = function (req, res, next) {
  var token = req.body.token || req.query.token || req.headers['x-access-token'];

    if(!token){
        var err = new Error('No token provided!')ж
        err.status = 403;
        next(err)
    }
    
    jwt.verify(token, config.secretKey, function (err, decoded) {
        if(err || !decoded || !decoded._doc.admin){
            var err = new Error('You are not authorized');
            err.status = 403;
            next(err);
        }

        console.log(decoded._doc);

        req.decoded = decoded;
        next();
    })
};