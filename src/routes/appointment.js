const express = require('express');
const appointment = express.Router();
const appointmentModel = require('../model/appointment');
const md5 = require('md5');
const jwt = require('jsonwebtoken');
const validateAppointment = require('../validation/appointmentValidation');

appointment.use(function(req, res, next) {
    try {
        jwt.verify(req.headers['authorization'], process.env.JWT_ID);
        next();
    } catch(error) {
        res.send("invalid token");
    }
})

appointment.post('/add', async function(req, res) {
    const data = req.body;
    const validate = validateAppointment(data);
    if(validate.error && validate.error.details) {
        res.status(401).send(validate.error.details);
    } else {
        const token =  req.headers['authorization'];
        const userDetail = jwt.verify(token, process.env.JWT_ID);

        // const fetchUser = await appointmentModel.findOne({where: { date: data.date, time: data.time, car_model: data.car_model, car_id: data.car_id, user_id: userDetail.user_id}});
        // if(fetchUser === null) {
            const insertQuery = await appointmentModel.create({user_id:userDetail.user_id, ...data});
            res.send({status: true, data: insertQuery, message: "Appointment register successful"});
        // } else {
        //     res.send({status: false, data: [], message: "Appointment already registered on this vehicle"});
        // }
    }
});

module.exports = appointment;