'use strict';

const Word = require('../models/word');
const User = require('../models/user');
const util = require('../util');

/**
 * 셔플
 * @param {*} array 셔플할 배열
 */
const shuffle = (array) => {
  for (let i = array.length; i; i -= 1) {
    let randomIdx = Math.floor(Math.random() * i);
    let temp = array[i - 1];
    array[i - 1] = array[randomIdx];
    array[randomIdx] = temp;
  }
};

/**
 * 퀴즈 문제 클래스
 */
const Question = (function() {
  const _req = new WeakMap();
  const _res = new WeakMap();
  const _jwtObj = new WeakMap();
  const _q = new WeakMap();

  class Question {
    constructor (req, res) {
      _req.set(this, req);
      _res.set(this, res);
      _jwtObj.set(this, req.jwtobj);
      _q.set(this, {});
    }

    // 단어의 뜻 맞추기
    type0() {
      const setQuestion = (user) => {
        if (user.words.length < 1) {
          throw util.LogicalError('There is no word to memorize');
        }

        const targetWord = user.words[0];
        const correctMeanIdx = Math.floor(Math.random() * targetWord.word_mean.length);

        // 문제 설정
        _q.get(this).question = {
          word_id: targetWord._id,
          value: targetWord.word_name
        };

        // 정답 설정
        _q.get(this).examples = [{
          value: targetWord.word_mean[correctMeanIdx].mean,
          isRight: true
        }]
        user.words.splice(0, 1);

        return user.words;
      };

      const setExamples = (words) => {
        const wordsClone = words;

        // 오답 설정
        for (let i = 0; i < 3; i++) {
          const wordIdx = Math.floor(Math.random() * wordsClone.length);
          const meanIdx = Math.floor(Math.random() * wordsClone[wordIdx].word_mean.length);

          _q.get(this).examples.push({
            value: wordsClone[wordIdx].word_mean[meanIdx].mean,
            isRight: false
          });

          wordsClone.splice(wordIdx, 1);
        }
        shuffle(_q.get(this).examples);

        return _q.get(this);
      };

      const onResponse = (data) => {
        _res.get(this).status(200).json(util.success('Read success', data));
      };

      const onError = (error) => {
        console.error(error);
        if (error.name === util.errorName) {
          _res.get(this).status(200).json(JSON.parse(error.message));
        } else {
          _res.get(this).status(500).json(error);
        }
      };
      
      User.findWordList(_jwtObj.get(this).name, { sort: { 'score': 1 } })
      .then(setQuestion)
      .then(setExamples)
      .then(onResponse)
      .catch(onError);
    }

    // 뜻에 해당하는 단어 맞추기
    type1() {
      const setQuestion = (user) => {
        if (user.words.length < 1) {
          throw util.LogicalError('There is no word to memorize');
        }

        const targetWord = user.words[0];
        const correctMeanIdx = Math.floor(Math.random() * targetWord.word_mean.length);

        // 문제 설정
        _q.get(this).question = {
          word_id: targetWord._id,
          value: targetWord.word_mean[correctMeanIdx].mean
        };

        // 정답 설정
        _q.get(this).examples = [{
          value: targetWord.word_name,
          isRight: true
        }]
        user.words.splice(0, 1);

        return user.words;
      };

      const setExamples = (words) => {
        const wordsClone = words;

        // 오답 설정
        for (let i = 0; i < 3; i++) {
          const wordIdx = Math.floor(Math.random() * wordsClone.length);

          _q.get(this).examples.push({
            value: wordsClone[wordIdx].word_name,
            isRight: false
          });

          wordsClone.splice(wordIdx, 1);
        }
        shuffle(_q.get(this).examples);

        return _q.get(this);
      };

      const onResponse = (data) => {
        _res.get(this).status(200).json(util.success('Read success', data));
      };

      const onError = (error) => {
        console.error(error);
        if (error.name === util.errorName) {
          _res.get(this).status(200).json(JSON.parse(error.message));
        } else {
          _res.get(this).status(500).json(error);
        }
      };

      User.findWordList(_jwtObj.get(this).name, { sort: { 'score': 1 } })
      .then(setQuestion)
      .then(setExamples)
      .then(onResponse)
      .catch(onError);
    }
  }
  return Question;
}());

/**
 * 트레이닝 문제 출제
 * type 1 : 단어에 뜻 맞추기
 * type 2 : 뜻에 해당하는 단어 맞추기
 */
exports.getExamQuestion = (req, res, next) => {
  const { type } = req.params;
  const q = new Question(req, res);
  
  switch (type) {
    case '0':
      q.type0();
      break;
    case '1':
      q.type1();
      break;
    default:
    res.status(500).json(util.fail('The type does not exist'));
  }
};