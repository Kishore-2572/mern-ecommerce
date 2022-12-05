const e = require('express');
const jwt = require('jsonwebtoken');

const generateToken = (user) => {
  return jwt.sign(
    {
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    },
    process.env.SECRET_KEY,
    { expiresIn: '30d' }
  );
};

const isAuth = (req, res, next) => {
  const authorization = req.headers.authorization;
  if (authorization) {
    const token = authorization.slice(7, authorization.length);
    jwt.verify(token, process.env.SECRET_KEY, (err, data) => {
      if (err) {
        res.status(401).send({ message: 'Invalid Token' });
      } else {
        req.user = data;
        next();
      }
    });
  } else {
    res.status(401).send({ message: 'you are not authenticated' });
  }
};

module.exports = { generateToken, isAuth };
