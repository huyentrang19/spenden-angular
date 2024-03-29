const express = require('express')
const users = express.Router()
const cors = require('cors')
const jwt = require('jsonwebtoken')
const User = require('../models/User')
const Spenden = require('../models/Spenden')
users.use(cors())
process.env.SECRET_KEY = 'secret'
//Register
users.post('/register', (req, res) => {
  const today = new Date()
    const userData = {
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    email: req.body.email,
    password: req.body.password,
    created: today
    }
    console.log("userInfos: " + userData)

  User.findOne({
    where: {
      email: req.body.email
    }
  })
    
    .then(user => {
      if (!user) {
        User.create(userData)
          .then(user => {
            let token = jwt.sign(user.dataValues, process.env.SECRET_KEY, {
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
})

//Login
users.post('/login', (req, res) => {
  User.findOne({
    where: {
      email: req.body.email,
      password: req.body.password
    }
  })
    .then(user => {
      if (user) {
        let token = jwt.sign(user.dataValues, process.env.SECRET_KEY, {
          expiresIn: 1440
        })
        res.json({ token: token })
      } else {
        res.send('User does not exist')
      }
    })
    .catch(err => {
      res.send('error: ' + err)
    })
})
//Profile
users.get('/profile', (req, res) => {
    var decoded = jwt.verify(req.headers['authorization'], process.env.SECRET_KEY)
        
        //spendens infos auslesen
        Spenden.findOne({
            where: {
                email: decoded.email
            }
        })
            .then(spenden => {
                if (spenden) {
                    res.json(spenden)
                } else {
                    res.send(false)
                }
            })
            .catch(err => {
                res.send('error: ' + err)
            })

})
module.exports = users
