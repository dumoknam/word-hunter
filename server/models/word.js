'use strict';

const mongoose    = require('mongoose');
const Schema      = mongoose.Schema;

const wordSchema = new Schema({
  word_name: {
    type: String,
    require: true,
    trim: true,
    default: ''
  },
  // word_format: { type: mongoose.Schema.Types.ObjectId, ref: 'WordFormats' },
  word_mean: [{ type: mongoose.Schema.Types.ObjectId, ref: 'WordMean' }],
  word_example: {
    type: String,
    trim: true,
    default: ''
  }
});

wordSchema.statics = {
  create: function(word) {
    const wordrow = new this(word);
    return wordrow.save();
  }
}

module.exports = mongoose.model('Word', wordSchema);