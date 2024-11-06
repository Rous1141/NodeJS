const jwt = require('jsonwebtoken');
const express = require('express')
const bodyParser = require('body-parser')
const loginRouter = express.Router()
loginRouter.use(bodyParser.json())
const User = require("../models/user")
loginRouter.route("/")
.post(async (req, res) => {
  var username = req.body.username
  var password = req.body.password

  // Find the user
  var user = await User.findOne({ username });
  if (user===null){
    return res.status(404).json({ message: 'No Existing User' });
  }

  // Compare passwords
  if (password !== user.password){
    return res.status(400).json({ message: 'Invalid password! Please Try Again' });
  } 
  // Generate a JWT token
  const token = jwt.sign({ userId: user._id, userName: user.userName }, 'SND301M_PE_FA24_SE171697', { expiresIn: '1h' }); 
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