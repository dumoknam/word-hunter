'use strict';

const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

module.exports = () => {
  function connect() {
    mongoose.connect('mongodb://js428118:thinghowa0428@localhost:27017/admin', {
      dbName: "wordhunter", 
      useNewUrlParser: true,
      useCreateIndex: true
    }, (err) => {
      if (err) {
        console.error('mongodb connection error', err);
      }
      console.log('mongodb connected');
    });
  }
  connect();

  // 연결이 해제될 시에 다시 연결
  mongoose.connection
    .on('error', console.error)
    .on('disconnected', connect);
};