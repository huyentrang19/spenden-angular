const Sequelize = require('sequelize')
const db1 = require('../database/db.js')

module.exports = db1.sequelize.define(
    'spenden',
    {
        donateid: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        amount: {
            type: Sequelize.STRING
        },
        donatesgoal: {
            type: Sequelize.STRING
        },
        email: {
            type: Sequelize.STRING
        },
               
        created: {
            type: Sequelize.DATE,
            defaultValue: Sequelize.NOW
        },
    },  
    
    {
        timestamps: false,
         },
);

   
     


