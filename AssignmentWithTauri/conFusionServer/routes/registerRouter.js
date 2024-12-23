 const express = require('express');
 const bodyParser = require('body-parser')
 const Account = require('../models/account')
 const registerRouter = express.Router();
 const cors = require('./cors')
 registerRouter.use(bodyParser.json())
 // CORS handlers
 registerRouter.route('/')
 .options(cors.corsWithOptions,(req,res)=>{res.sendStatus(200)})
 .post(cors.corsWithOptions,(req,res,next) => {
    var username = req.params.username
    // Check if user already exists
    const userExists = Account.findOne({ "username":username });
    if (userExists===null){
        return res.status(400).json({ message: 'Error: User already exists!' });
    } 
    Account.create(req.body)
            .then((account) => {
                console.log('Account Created! ',+account)
                res.statusCode = 200
                res.json(account)
            }, (err) =>
                next(err))
            .catch((err) => next(err))
  })
  
.get(cors.cors,(req, res,next) => {
    Account.find({})
     .then((users) => {
        res.statusCode = 400;
        res.setHeader("Content-Type","application/json")
        return res.end("Method GET Not supported")
      }, (err) => next(err))
     .catch((err) => next(err))
  })
.delete(cors.corsWithOptions,(req, res,next) => {
    Account.find({})
     .then((users) => {
        res.statusCode = 400;
        res.setHeader("Content-Type","application/json")
        return res.end("Method DELETE Not supported")
      }, (err) => next(err))
     .catch((err) => next(err))
  })
.put(cors.corsWithOptions,(req, res,next) => {
    Account.find({})
     .then((users) => {
        res.statusCode = 400;
        res.setHeader("Content-Type","application/json")
        return res.end("Method PUT Not supported")
      }, (err) => next(err))
     .catch((err) => next(err))
  })

  module.exports = registerRouter;