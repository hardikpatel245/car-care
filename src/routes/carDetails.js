const express = require('express');
const cardDetails = express.Router();
const carModel = require('../model/carModel');
const modelModel = require('../model/modelModel');
const modelListValidation = require('../validation/modelListValidation');
const jwt = require('jsonwebtoken');

cardDetails.use(function(req, res, next) {
    try {
        jwt.verify(req.headers['authorization'], process.env.JWT_ID);
        next();
    } catch(error) {
        res.send("invalid token");
    }
})

cardDetails.get('/card_list', async function(req, res) {
    const allData = await carModel.findAll();
    res.send(allData);
});

cardDetails.post('/model_list', async function(req, res) {
    const data = req.body
    const validate = modelListValidation(data);
    if(validate.error && validate.error.details) {
        res.send(validate.error.details);
    } else {
        const allData = await modelModel.findAll({where: { car_id: data.car_id }});
        res.send(allData);
    }
});

module.exports = cardDetails;