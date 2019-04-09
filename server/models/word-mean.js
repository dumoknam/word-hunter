'use strict';

const mongoose  = require('mongoose');
const Schema    = mongoose.Schema;

const wordMeanSchema = new Schema({
  mean: {
    type: String,
    trim: true,
    require: true,
    default: ''
  }
});

wordMeanSchema.statics = {
  create: function(means) {
    const wordMean = new this(means);
    return wordMean.save();
  }
};

module.exports = mongoose.model('WordMean', wordMeanSchema);