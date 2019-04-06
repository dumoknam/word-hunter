'use strict';

const mongoose  = require('mongoose');
const Schema    = mongoose.Schema;

const wordMeanSchema = new Schema({
  mean: {
    type: String,
    trim: true,
    default: ''
  }
});

module.exports = mongoose.model('WordMean', wordMeanSchema);