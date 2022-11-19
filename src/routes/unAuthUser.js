const express = require('express');
const user = express.Router();
const jwt = require('jsonwebtoken');

user.get('/token_generate', function(req, res) {
    let jwtSecretKey = "Hardik";
    let data = {
        time: Date(),
        userId: 12,
    }
    const token = jwt.sign(data, jwtSecretKey);
    res.send(token);
})

module.exports = user;