'use strict';

const router = require('express').Router();
const authController  = require('../controller/auth-controller');
const userController  = require('../controller/user-controller');
const wordController  = require('../controller/word-controller');
const wordMeanController = require('../controller/word-mean-controller');

// 유저 등록
router.post('/signup', userController.registeredUser);

// 아이디 중복체크
router.get('/idcheck/:name', userController.checkDuplicateId);

// 로그인
router.post('/login', userController.login);

// 단어 등록
router.post('/word', authController.isLogin, wordController.registeredWord);

// 단어 수정
router.put('/word', authController.isLogin, wordController.updateWord);

// 단어 삭제
router.delete('/word', authController.isLogin, wordController.removeWords);

// 단어 목록 조회
router.get('/word', authController.isLogin, wordController.getWordList);

// 단어 조회
router.get('/word/:id', authController.isLogin, wordController.getWord);

module.exports = router;