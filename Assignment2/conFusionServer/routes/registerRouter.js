 const express = require('express');
 const bodyParser = require('body-parser')
 const Account = require('../models/account')
 const registerRouter = express.Router();
 registerRouter.use(bodyParser.json())
 
 registerRouter.post('/', (req, res) => {
    var userName = req.params.userName
    var password = req.params.password
  
    // Check if user already exists
    const userExists = Account.findOne({ userName });
    if (userExists){
        return res.status(400).json({ message: 'User already exists!' });
    } 
    // Create new user
    const newUser = new Account({ userName, password });
     newUser.save();
    res.status(200).json({ message: 'User registered successfully' });
  });
  
  module.exports = registerRouter;