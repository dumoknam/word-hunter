'use strict';

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
    req.decoded = decoded;
    next();
  };

  const onError = (error) => {
    res.status(403).json(util.fail(error.message));
  };

  p.then(onResponse).catch(onError);
};