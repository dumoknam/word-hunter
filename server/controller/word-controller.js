'use strict';

const WordMean = require('../models/word-mean');
const Word = require('../models/word');
const User = require('../models/user');
const util = require('../util');

/**
 * 단어 등록
 */
exports.registeredWord = (req, res, next) => {
  const { word, means } = req.body.params;
  const jwtobj = req.jwtobj;

  const insertWord = (wordmean) => {
    const meansid = wordmean.reduce((meansid, mean) => {
      meansid.push({ _id: mean._id });
      return meansid;
    }, []);
    
    const wordData = {
      word_name: word,
      word_mean: meansid
    };

    return Word.create(wordData);
  };

  const updateUser = (word) => {
    User.findOneByNameCallback(jwtobj.name, (err, userData) => {
      userData.words.push({ _id: word._id });
      userData.save((error) => {
        if (error) res.status(500).json({error: 'failed to update'});
        res.status(200).json(util.success('Word added!'));
      });
    });
  };

  const onError = (error) => {
    console.log(error);
    if (error.name === util.errorName) {
      res.status(200).json(JSON.parse(error.message));
    } else {
      res.status(500).json(error);
    }
  };

  WordMean.insertMany(means)
  .then(insertWord)
  .then(updateUser)
  .catch(onError);
};

/**
 * 단어 수정
 */
exports.updateWord = (req, res, next) => {

};

/**
 * 단어 삭제
 */
exports.removeWords = (req, res, next) => {

};

/**
 * 단어 목록 조회
 */
exports.getWordList = (req, res, next) => {

};

/**
 * 단어 조회
 */
exports.getWord = (req, res, next) => {

};