'use strict';

module.exports = {
  db: {
    mongodbUri: 'mongoDB uri',
    dbInfo: {
      dbName: 'database name',
      useNewUrlParser: true,
      useCreateIndex: true
    }
  },
  jwtconf: {
    secret: 'jwt secret key'
  }
};