const express = require('express')
const spenden = express.Router()
const cors = require('cors')
const jwt = require('jsonwebtoken')
const Spenden = require('../models/Spenden')
spenden.use(cors())
process.env.SECRET_KEY = 'secret'
//Spenden 
spenden.post('/spenden', (req, res) => {
    const today = new Date()
    const spendenData = {
        donateid: req.body.donateid,
        donatesgoal: req.body.donatesgoal,
        email: req.body.email,
        amount: req.body.amount,
        created: today
    }
    Spenden.findOne({
        where: {
            email: req.body.email
        }
    })
        .then(spender => {
            if (!spender) {
                Spenden.create(spendenData)
                    .then(spender => {
                        let token = jwt.sign(spender.dataValues, process.env.SECRET_KEY, {
                            expiresIn: 1440
                        })
                        res.json({ token: token })
                    })
                    .catch(err => {
                        res.send('error: ' + err)
                    })
            } else {
                res.json({ error: 'User already exists' })
            }
        })
        .catch(err => {
            res.send('error: ' + err)
        })
});
module.exports = spenden


