const express = require('express');
const category = express.Router();
const categoryModel = require('../model/categoryModel');
const jwt = require('jsonwebtoken');

category.use(function(req, res, next) {
    try {
        jwt.verify(req.headers['authorization'], process.env.JWT_ID);
        next();
    } catch(error) {
        res.send("invalid token");
    }
})

category.get('/all', async function(req, res) {
    const token =  req.headers['authorization'];
    const allData = await categoryModel.findAll();
    res.send(allData);
});

module.exports = category;