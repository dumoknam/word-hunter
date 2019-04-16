const mongoose  = require('mongoose');
const Schema    = mongoose.Schema;

const userSchema = new Schema({
  name: { 
    type: String, 
    require: true, 
    unique: true, 
    trim: true,
    default: '' 
  },
  password: {
    type: String,
    require: true,
    trim: true,
    default: ''
  },
  salt: {
    type: String,
    require: true,
    trim: true,
    default: ''
  },
  nickname: {
    type: String,
    trim: true,
    default: ''
  },
  email: {
    type: String,
    trim: true,
    default: ''
  },
  words: [{ type: Schema.Types.ObjectId, ref: 'Word' }],
  memorized: [{ type: Schema.Types.ObjectId, ref: 'Word' }],
  state: {
    type: Number,
    require: true,
    default: 0
  },
  signup_date: {
    type: Date,
    require: true,
    default: Date.now,
  },
  learning_days: [{ type: Date }]
});

userSchema.statics = {
  create: function(name, password, salt, nickname, email) {
    const user = new this({
      name,
      password,
      salt,
      nickname,
      email
    });
    return user.save();
  },
  findOneForLogin: function(name, password) {
    return this.findOne({ name, password });
  },
  findOneByName: function(name, callback) {
    return this.findOne({ name });
  },
  findOneByNameCallback: function(name, callback) {
    return this.findOne({ name }, callback);
  },
  findWordList: function(name, options) {
    return this.findOne({ name })
    .populate({
      path: 'words',
      options,
      populate: { path: 'word_mean' }
    }).populate({
      path: 'memorized',
      populate: { path: 'word_mean' }
    }).exec();
  },
  findWordListByKeyword: function(name, keyword) {
    return this.findOne({ name })
    .populate({
      path: 'words',
      // match: {
      //   $or: [
      //     { 'word_name': { $regex: keyword, $options: 'i' } },
      //   ]
      // },
      match: { 'word_name': { $regex: keyword, $options: 'i' } },
      populate: { path: 'word_mean' }
    }).populate({
      path: 'memorized',
      match: { 'word_name': { $regex: keyword, $options: 'i' } },
      populate: { path: 'word_mean' }
    }).exec();
  }
}

module.exports = mongoose.model('User', userSchema);