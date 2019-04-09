'use strict';

const User = require('../models/user');
const encryptCommon = require('../encryptCommon');
const util = require('../util');

/**
 * 유저 등록
 */
exports.registeredUser = (req, res, next) => {
  const { name, password, nickname, email } = req.body.params;

  if (!name || name === "") {
    throw util.LogicalError('You have to receive user name');
  }

  if (!password || password === "") {
    throw util.LogicalError('You have to receive user password');
  }

  const userCreate = ({encryptPassword, salt}) => {
    return User.create(name, encryptPassword, salt, nickname, email);
  };

  const postCreateUser = (user) => {
    res.status(200).json(util.success(`Welcom to join us! Let's login`));
  };

  const onError = (error) => {
    if (error.name === util.errorName) {
      res.status(200).json(JSON.parse(error.message));
    } else {
      res.status(500).json(error);
    }
  };

  encryptCommon.saltEncrypt(password)
  .then(userCreate)
  .then(postCreateUser)
  .catch(onError);
};

/**
 * 아이디 중복 체크
 */
exports.checkDuplicateId = (req, res, next) => {
  const name = req.params.name;
  const postIdCheck = (user) => {

    let isDuplicated = false;
    if (user) {
      // 중복 true
      isDuplicated = true;
    }
    res.status(200).json(util.success('', { isDuplicated }));
  };

  const onError = (error) => {
    if (error.name === util.errorName) {
      res.status(200).json(JSON.parse(error.message));
    } else {
      res.status(500).json(error);
    }
  };

  User.findOneByName(name)
  .then(postIdCheck)
  .catch(onError);
};

/**
 * 유저 로그인
 */
exports.login = (req, res, next) => {
  const { name, password } = req.body.params;
  let originalUserData = '';
  
  // 데이터 있으면 salt값으로 new password 암호화하고
  const passwordEncrypt = (user) => {
    if (user) {
      originalUserData = user;
      return encryptCommon.saltEncrypt(password, user.salt);
    }
    throw util.LogicalError('Not found user');
  }

  // 기존 암호랑 비교
  const verification = ({ encryptPassword }) => {
    if (originalUserData.password !== encryptPassword) {
      throw util.LogicalError('Password is wrong');
    }

    // 토큰화
    const payload = {
      name: originalUserData.name,
      nickname: originalUserData.nickname,
      email: originalUserData.email
    }

    return encryptCommon.jwtSign(req.app.get('jwt-secret'), payload);
  };

  const onResponse = (token) => {
    res.status(200).json(util.success('Login success', { token }));
  };

  const onError = (error) => {
    if (error.name === util.errorName) {
      res.status(200).json(JSON.parse(error.message));
    } else {
      res.status(500).json(error);
    }
  };

  // name으로 salt값 조회
  User.findOneByName(name)
  .then(passwordEncrypt)
  .then(verification)
  .then(onResponse)
  .catch(onError);
};