const express = require('express');
const app = express();
const sequelize = require('./src/model/userModel'); 
const bodyParser = require('body-parser');
require('dotenv').config();
const cors = require('cors');

app.use(cors());
app.get('/', function(req, res) {
    res.send("Page not found")
});

// sequelize.sync();

app.use(bodyParser.json());
const router = require('./src/routes/index');
const auth = require('./src/routes/auth/authentication');
app.use('/web', router);
app.use('/api/auth', auth);

app.listen(process.env.PORT, function() {
    console.log("server start", process.env.PORT);    
})