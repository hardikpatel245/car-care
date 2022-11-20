const Sequelize = require('sequelize')
const sequelize = require('../config/dbConfig')
  
const User = sequelize.define('appointment', {
    appointment_id:{
        type:Sequelize.INTEGER,
        autoIncrement:true,
        allowNull:false,
        primaryKey:true
    },
    user_id: { type: Sequelize.INTEGER, allowNull:false },
    car_id: { type: Sequelize.INTEGER, allowNull:false },
    car_model: { type: Sequelize.INTEGER, allowNull:false },
    service_type: { type: Sequelize.STRING, allowNull:true },
    date: { type: Sequelize.STRING, allowNull:false },
    time: { type: Sequelize.STRING, allowNull:false },
    createdAt: Sequelize.DATE,
    updatedAt: Sequelize.DATE,
})

module.exports = User