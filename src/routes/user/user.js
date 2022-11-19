const express = require('express');
const user = express.Router();
const userModel = require('../../model/userModel');
const jwt = require('jsonwebtoken');
// const uploadFile = require('../config/uploadConfig');
// const validateUser = require('../validation/addUserValidation');

// user.post('/add', async function(req, res) {
//     const data = req.body;
//     const validate = validateUser(data);
//     if(validate.error.details) {
//         res.send(validate.error);
//     } else {
//         await userModel.create({
//             name: data['name'],
//             email: data['email'],
//             myDate: data['myData']
//         });
//         res.send("Date create success full");
//     }
// });

user.use(function(req, res, next) {
    try {
        jwt.verify(req.headers['authorization'], process.env.JWT_ID);
        next();
    } catch(error) {
        res.send("invalid token");
    }
})

user.get('/all', async function(req, res) {
    const token =  req.headers['authorization'];
    const userDetail = jwt.verify(token, process.env.JWT_ID);
    const allData = await userModel.findOne({where: { user_id: userDetail.user_id }});
    res.send(allData);
});

// user.post('/upload_file', uploadFile, function (req, res) {
//     console.log(req.file, req.body)
//     res.send("image upload");
//  })

module.exports = user;