const express = require('express');
const app = express();
const sequelizeUser = require('./src/model/userModel'); 
const sequelizeCar = require('./src/model/carModel'); 
const sequelizeModel = require('./src/model/modelModel'); 
const bodyParser = require('body-parser');
require('dotenv').config();
const cors = require('cors');

app.use(cors());
app.get('/', function(req, res) {
    res.send("Page not found")
});

sequelizeUser.sync();
sequelizeCar.sync();
sequelizeModel.sync();

app.use(bodyParser.json());
const router = require('./src/routes/user');
const auth = require('./src/routes/authentication');
const car =require('./src/routes/carDetails');

app.use('/api/user', router);
app.use('/api/auth', auth);
app.use('/api/car', car);

app.listen(process.env.PORT, function() {
    console.log("server start", process.env.PORT);
})