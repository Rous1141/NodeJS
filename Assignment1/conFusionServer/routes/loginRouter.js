const jwt = require('jsonwebtoken');
const express = require('express')
const bodyParser = require('body-parser')
const loginRouter = express.Router()
loginRouter.use(bodyParser.json())
const Account = require("../models/account")
loginRouter.post('/', (req, res) => {
  var userName = req.params.userName
  var password = req.params.password

  // Find the user
  var user =  Account.findOne({ userName });
  if (user===null){
    return res.status(404).json({ message: 'No Existing User' });
  }

  // Compare passwords
  if (password !== user.password){
    return res.status(400).json({ message: 'Invalid password! Please Try Again' });
  } 
  // Generate a JWT token
  const token = jwt.sign({ userId: user._id, userName: user.userName }, 'secretKey', { expiresIn: '1h' }); 
  // Token expires in 1 hour "1h"
  res.json({ token });
});
module.exports = loginRouter;