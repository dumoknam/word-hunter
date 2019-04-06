'use strict';

const User = require("../models/user");

/**
 * 유저 등록
 */
exports.registeredUser = (req, res, next) => {
  const user = new User();
  user.name = req.body.name;
  user.password = req.body.password;
  user.nickname = req.body.nickname;
  User.create(user)
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      res.status(500).json({error: err, result: 0});
      return;
    });
};

/**
 * 유저 로그인
 */
exports.authUser = (req, res, next) => {
  const query = {
    "name": req.body.params.name,
    "password": req.body.params.password
  };

  User.read(query)
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      res.status(500).json({error: err, result: 0});
    });
};