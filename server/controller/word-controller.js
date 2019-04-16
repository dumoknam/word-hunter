'use strict';

const Word = require('../models/word');
const WordMean = require('../models/word-mean');
const User = require('../models/user');
const util = require('../util');

/**
 * 단어 등록
 */
exports.registeredWord = (req, res, next) => {
  const { word, means } = req.body.params;
  const jwtObj = req.jwtobj;

  const insertWord = (wordMean) => {
    const meansId = wordMean.reduce((meansId, mean) => {
      meansId.push({ _id: mean._id });
      return meansId;
    }, []);
    
    const wordData = {
      word_name: word,
      word_mean: meansId
    };

    return Word.create(wordData);
  };

  const updateUser = (word) => {
    User.findOneByNameCallback(jwtObj.name, (error, userData) => {
      if (error) res.status(500).json({ error: 'Failed to read' });
      userData.words.push({ _id: word._id });
      userData.save((error) => {
        if (error) res.status(500).json({ error: 'Failed to update' });
        res.status(200).json(util.success('Word added'));
      });
    });
  };

  const onError = (error) => {
    console.error(error);
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
  const { wordId, word } = req.body.params;

  const onResponse = (result) => {
    if (result.ok === 1) {
      res.status(200).json(util.success('Update completed'));
    }
  };

  const onError = (error) => {
    console.error(error);
    if (error.name === util.errorName) {
      res.status(200).json(JSON.parse(error.message));
    } else {
      res.status(500).json(error);
    }
  };

  Word.updateWord(wordId, word)
  .then(onResponse)
  .catch(onError);
};

/**
 * 단어 스코어 증가
 */
exports.increaseWordScore = (req, res, next) => {
  const { wordId } = req.body.params;

  const onResponse = (word) => {
    const wordClone = word;
    wordClone.score += 1;
    wordClone.save((error) => {
      if (error) res.status(500).json({ error: 'Failed to update' });
      res.status(200).json(util.success('Score increased'));
    });
  };

  const onError = (error) => {
    console.error(error);
    if (error.name === util.errorName) {
      res.status(200).json(JSON.parse(error.message));
    } else {
      res.status(500).json(error);
    }
  };

  Word.findOneById(wordId)
  .then(onResponse)
  .catch(onError);
};

/**
 * 단어 삭제(기본)
 */
exports.removeWord = (req, res, next) => {
  const wordId = req.params.word_id;
  const isMemorized = JSON.parse(req.params.is_memorized);
  const jwtObj = req.jwtobj;
  console.log(isMemorized);

  // word collection 조회 & word mean 제거 / 성공여부 리턴
  const deleteWordMean = (word) => {
    if (word !== null && word.word_mean.length > 0) {
      const result = WordMean.deleteManyById(word.word_mean);
      return result;
    }
    return {ok: 1};
  };

  // 성공시 word 제거 / 성공여부 리턴
  const deleteWord = (isSuccess) => {
    if (isSuccess.ok !== 1) res.status(500).json({ error: 'Failed to delete' });
    const result = Word.deleteOneById(wordId);
    return result;
  };

  // 사용자 조회 / 사용자 리턴
  const findUser = (isSuccess) => {
    if (isSuccess.ok !== 1) res.status(500).json({ error: 'Failed to delete' });
    const user = User.findOneByName(jwtObj.name);
    return user;
  };

  // 사용자 words 에서 word 제거 후 save / 성공여부 리턴
  const updateUser = (user) => {
    if (isMemorized) {
      // memorized에 있는 단어를 제거시
      const index = user.memorized.indexOf(wordId);
      if (index > -1)
        user.memorized.splice(index, 1);
    } else {
      // 일반 단어 목록(words)에 있는 단어를 제거시
      const index = user.words.indexOf(wordId);
      if (index > -1)
        user.words.splice(index, 1);
    }
    user.save((error) => {
      if (error) res.status(500).json({ error: 'Failed to update' });
    });
    return true;
  };

  const onResponse = (isSuccess) => {
    if (isSuccess) {
      res.status(200).json(util.success('Delete completed'));
    }
  };

  const onError = (error) => {
    console.error(error);
    if (error.name === util.errorName) {
      res.status(200).json(JSON.parse(error.message));
    } else {
      res.status(500).json(error);
    }
  };

  Word.findOneById(wordId)
  .then(deleteWordMean)
  .then(deleteWord)
  .then(findUser)
  .then(updateUser)
  .then(onResponse)
  .catch(onError);
};

/**
 * 단어 목록 조회
 */
exports.getWordList = (req, res, next) => {
  const jwtObj = req.jwtobj;

  const onResponse = (user) => {
    res.status(200).json(util.success('Read success', { 
      wordList: user.words,
      memorizedList: user.memorized
    }));
  };

  const onError = (error) => {
    console.error(error);
    if (error.name === util.errorName) {
      res.status(200).json(JSON.parse(error.message));
    } else {
      res.status(500).json(error);
    }
  };
  
  User.findWordList(jwtObj.name)
  .then(onResponse)
  .catch(onError);
};

/**
 * 단어 조회
 */
exports.getWord = (req, res, next) => {
  const jwtObj = req.jwtobj;
  const { keyword } = req.params;

  const onResponse = (user) => {
    res.status(200).json(util.success('Read success', { 
      wordList: user.words,
      memorizedList: user.memorized
    }));
  };

  const onError = (error) => {
    console.error(error);
    if (error.name === util.errorName) {
      res.status(200).json(JSON.parse(error.message));
    } else {
      res.status(500).json(error);
    }
  };

  User.findWordListByKeyword(jwtObj.name, keyword)
  .then(onResponse)
  .catch(onError);
};