const express = require('express');
const auth = express.Router();
const userModel = require('../model/userModel');
const md5 = require('md5');
const jwt = require('jsonwebtoken');
const validateUser = require('../validation/addUserValidation');
const loginUserValidation = require('../validation/loginUserValidation');

auth.post('/register', async function(req, res) {
    const data = req.body;
    const validate = validateUser(data);
    if(validate.error && validate.error.details) {
        res.status(401).send(validate.error.details);
    } else {
        const fetchUser = await userModel.findOne({where: { email: data.email, isAdmin: data.isAdmin}});
        if(fetchUser === null) {
            const insertQuery = await userModel.create({
                "name": data.name,
                "email": data.email,
                "password": md5(data.password),
                "carId": data.carId,
                "modelId": data.modelId,
                "mobile": data.mobile,
                "isAdmin": data.isAdmin
            });
            res.status(200).send({data: insertQuery, message: "Sign up successful"});
        } else {
            res.status(401).send({data: [], message: "Email already exits"});
        }
    }
});


auth.post('/login', async function(req, res) {
    const data = req.body;
    const validate = loginUserValidation(data);
    if(validate.error && validate.error.details) {
        res.status(401).send(validate.error.details);
    } else {
        const fetchUser = await userModel.findOne({where: { email: data.email, isAdmin: data.isAdmin}});
        if(fetchUser !== null) {
            if(fetchUser.password === md5(data.password))  {
                let data = {
                    time: Date(),
                    user_id: fetchUser.user_id,
                    isAdmin: fetchUser.isAdmin
                }
                const token = jwt.sign(data, process.env.JWT_ID);
                res.status(200).send({data: {user_id: fetchUser.user_id, name: fetchUser.name, email: fetchUser.email, isAdmin: fetchUser.isAdmin, token: token}, message: "Login successful"});
            } else {
                res.status(200).send({data: [], message: "Password not match"});
            }
        } else {
            res.status(401).send({data: [], message: "Email not found"});
        }
    }
});

module.exports = auth;