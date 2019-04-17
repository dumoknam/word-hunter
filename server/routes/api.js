'use strict';

const router = require('express').Router();
const authController  = require('../controller/auth-controller');
const userController  = require('../controller/user-controller');
const wordController  = require('../controller/word-controller');
const wordMeanController = require('../controller/word-mean-controller');
const examController  = require('../controller/exam-controller');

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

// 단어 스코어 카운트 업
router.put('/word/score/increase', authController.isLogin, wordController.increaseWordScore);

// 단어 삭제
router.delete('/word/:word_id/:is_memorized', authController.isLogin, wordController.removeWord);

// 단어 목록 조회
router.get('/word', authController.isLogin, wordController.getWordList);

// 단어 조회 by word_name or mean
router.get('/word/:keyword', authController.isLogin, wordController.getWord);

// 단어 의미 추가
router.post('/mean', authController.isLogin, wordMeanController.insertWordMean);

// 단어 의미 수정
router.put('/mean', authController.isLogin, wordMeanController.updateWordMean);

// 단어 의미 삭제
router.delete('/mean/:mean_id', authController.isLogin, wordMeanController.deleteWordMean);

// 단어 문제 출제
router.get('/exam/:type', authController.isLogin, examController.getExamQuestion);

module.exports = router;