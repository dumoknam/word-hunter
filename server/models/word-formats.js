'use strict';

const mongoose    = require('mongoose');
const Schema      = mongoose.Schema;

const wordFormatsScema = new Schema({
  ko: {
    type: String,
    trim: true,
    default: ''
  },
  en: {
    type: String,
    trim: true,
    default: ''
  }
});

module.exports = mongoose.model('WordFormats', wordFormatsScema);