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
  },
  score: {
    type: Number,
    default: 0
  }
});

wordSchema.statics = {
  create: function(word) {
    const wordrow = new this(word);
    return wordrow.save();
  },
  findOneById: function(_id) {
    return this.findOne({ _id });
  },
  findByMeanId: function(_id) {
    return this.find({ 
      word_mean: { 
        $all: [_id]
      }
    });
  },
  updateWord: function(_id, word_name) {
    return this.updateOne({ _id }, { word_name });
  },
  deleteOneById: function(_id) {
    return this.deleteOne({ _id });
  }
}

module.exports = mongoose.model('Word', wordSchema);