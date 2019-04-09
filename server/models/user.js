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
  }
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
  findOneByName: function(name) {
    return this.findOne({ name });
  },
  findOneByNameCallback: function(name, callback) {
    return this.findOne({ name }, callback);
  }
}

module.exports = mongoose.model('User', userSchema);