'use strict';
const jwt = require('jsonwebtoken');
const util = require('../util');

exports.isLogin = (req, res, next) => {
  const token = req.headers['x-access-token'] || req.params.token;

  if (!token) {
    return res.status(403).json(util.fail('not logged in'));
  }

  const p = new Promise((resolve, reject) => {
    jwt.verify(token, req.app.get('jwt-secret'), (error, decoded) => {
      if (error) reject(error);
      resolve(decoded);
    });
  });

  const onResponse = (decoded) => {
    req.jwtobj = decoded;
    next();
  };

  const onError = (error) => {
    console.error(error.message);
    res.status(403).json(error);
  };

  p.then(onResponse).catch(onError);
};