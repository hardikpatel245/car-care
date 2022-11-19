const express = require('express');
const index = express.Router(); 
const jwt = require('jsonwebtoken');


const user = require('./user');
const unAuthUser = require('./unAuthUser');

index.use('/unAuthUser', unAuthUser);

index.use(function(req, res, next) {
    let jwtSecretKey = "Hardik";
    try {
        const verified = jwt.verify(req.headers['authorization'], jwtSecretKey);
        console.log(verified);
        next();
    } catch(error) {
        res.send("invalid token");
    }
})

index.use('/user', user);

module.exports = index;