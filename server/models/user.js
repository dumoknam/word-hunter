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
  nickname: {
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
    require: false
  }
});

userSchema.statics = {
  create: function(user) {
    return user.save();
  },
  read: function(query) {
    return this.find(query);
  }
}

module.exports = mongoose.model('User', userSchema);