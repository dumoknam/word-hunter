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
  },
  findOneById: function(_id) {
    return this.findOne({ _id });
  },
  updateMean: function(_id, mean) {
    return this.updateOne({ _id }, { mean });
  },
  deleteOneById: function(_id) {
    return this.deleteOne({ _id });
  },
  deleteManyById: function(_ids) {
    return this.deleteMany({ _id: { $in: _ids} })
  }
};

module.exports = mongoose.model('WordMean', wordMeanSchema);