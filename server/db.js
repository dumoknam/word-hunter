'use strict';
const config = require('./config/config');
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

module.exports = () => {
  function connect() {
    mongoose.connect(config.db.mongodbUri, config.db.dbInfo, (err) => {
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