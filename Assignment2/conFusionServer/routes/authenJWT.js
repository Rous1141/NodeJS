const jwt = require('jsonwebtoken');

const authenticateJWT = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    console.log('No Token')
    return res.status(403).json({ message: 'There is no Token' });
  }

  jwt.verify(token.split(' ')[1], 'secretKey', (err, user) => {
    if (err) {
      console.log('Wrong Token!')
      return res.status(401).json({ message: 'Wrong token' });
    }
    req.user = user; // Store user info in req
    next();
  });
};

module.exports = authenticateJWT;