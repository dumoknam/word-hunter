'use strict';

const WordMean = require('../models/word-mean');
const Word = require('../models/word');
const util = require('../util');

/**
 * 단어 의미 업데이트
 */
exports.updaateWordMean = (req, res, next) => {
  console.log("000");
  const { meanId, mean } = req.body.params;
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

  WordMean.updateMean(meanId, mean)
  .then(onResponse)
  .catch(onError);
};

/**
 * 단어 의미 삭제 
 */
exports.deleteWordMean = (req, res, next) => {
  const meanId = req.params.mean_id;

  // 현재 meanId를 가지고있는 모든 word collection 에서 단어 의미를 제거
  const deleteMeanInWord = (wordArray) => {
    for (let word of wordArray) {
      const index = word.word_mean.indexOf(meanId);
      word.word_mean.splice(index, 1);
      word.save((error) => {
        if (error) res.status(500).json({ error: 'Failed to update' });
      });
    }
    return true;
  };

  // word mean collection 에서 단어 의미 제거
  const deleteMean = (isSuccess) => {
    if (!isSuccess) res.status(500).json({ error: 'Failed to update' });
    const result = WordMean.deleteOneById(meanId);
    return result;
  };

  const onResponse = (result) => {
    if (result.ok === 1) {
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

  Word.findByMeanId(meanId)
  .then(deleteMeanInWord)
  .then(deleteMean)
  .then(onResponse)
  .catch(onError);
};
