'use strict';

const router = require('express').Router();
const userController  = require('../controller/user-controller');
const authController  = require('../controller/auth-controller');
const wordController  = require('../controller/word-controller');
const wordMeanController = require('../controller/word-mean-controller');

// 유저 등록
router.post('/signup', userController.registeredUser);

// 아이디 중복체크
router.get('/idcheck/:name', userController.checkDuplicateId);

// 로그인
router.post('/login', userController.login);

// auth
//router.post('/user/list', authController.isLogin, userController.getList);

module.exports = router;