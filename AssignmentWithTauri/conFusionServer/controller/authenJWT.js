const jwt = require('jsonwebtoken');

const authenticateJWT = (req, res, next) => {
  var token = req.headers['authorization'];
  console.log('Authorization token: ', token);

  if (!token) {
    console.log('No Token')
    return res.status(403).json({ message: 'There is no Token' });
  }

  jwt.verify(token.split(' ')[1], 'secretKey', (err, user) => {
    if (err) {
     console.log('Wrong Token!')
     res.status(401).json({ message: 'Wrong token' });
     var code = "Wrong Authentication"
     return res.redirect('/')
    }
    req.user = user; // Store the user info in request
    next();
  });
};
module.exports = authenticateJWT;