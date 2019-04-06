'use strict';

const express = require('express');
const router = express.Router();

const userController = require('../controller/user-controller');
const wordController = require('../controller/word-controller');
const wordMeanController = require('../controller/word-mean-controller');

// 유저 등록
router.post('/signup', userController.registeredUser);

// 아이디 중복체크
router.get('/idcheck', ()=>{});

// 로그인
router.post('/login', userController.authUser);


module.exports = router;