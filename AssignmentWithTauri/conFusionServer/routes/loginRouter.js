const jwt = require('jsonwebtoken');
const express = require('express')
const bodyParser = require('body-parser')
const loginRouter = express.Router()
var cors = require('../routes/cors');
loginRouter.use(bodyParser.json())
// CORS handlers


const Account = require("../models/account")
loginRouter.route("/")
.options(cors.corsWithOptions,(req,res)=>{res.sendStatus(200)})
.post(cors.corsWithOptions,async (req, res) => {
  var username = req.body.username
  var password = req.body.password

  // Find the user
  var user = await Account.findOne({ username });
  if (user===null){
    return res.status(404).json({ message: 'No Existing User' });
  }

  // Compare passwords
  if (password !== user.password){
    return res.status(400).json({ message: 'Invalid password! Please Try Again' });
  } 
  // Generate a JWT token
  const token = jwt.sign({ userId: user._id, userName: user.username }, 'secretKey', { expiresIn: '1h' }); 
  // Token expires in 1 hour "1h"
  res.json({ token });
})
.get((req, res)=>{
  return res.status(400).json({ message: 'Not Supported Method' });
})
.delete((req, res)=>{
  return res.status(400).json({ message: 'Not Supported Method' });
})
.put((req, res)=>{
  return res.status(400).json({ message: 'Not Supported Method' });
})

module.exports = loginRouter;