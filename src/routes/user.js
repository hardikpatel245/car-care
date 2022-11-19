const express = require('express');
const user = express.Router();
const userModel = require('../model/userModel');
const uploadFile = require('../config/uploadConfig');
const validateUser = require('../validation/addUserValidation');

user.post('/add', async function(req, res) {
    const data = req.body;
    const validate = validateUser(data);
    if(validate.error.details) {
        res.send(validate.error);
    } else {
        await userModel.create({
            name: data['name'],
            email: data['email'],
            myDate: data['myData']
        });
        res.send("Date create success full");
    }
});

user.post('/all', async function(req, res) {
    const allData = await userModel.findAll();
    res.send(allData);
});

user.post('/upload_file', uploadFile, function (req, res) {
    // req.file is the name of your file in the form above, here 'uploaded_file'
    // req.body will hold the text fields, if there were any 
    console.log(req.file, req.body)
    res.send("image upload");
 })

module.exports = user;