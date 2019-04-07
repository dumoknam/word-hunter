const jwt = require('jsonwebtoken');
const crypto = require('crypto');

const encryptCommon = {
  jwtSign(secret, payload) {
    return new Promise((resolve, reject) => {
      jwt.sign(payload, secret, {
        expiresIn: '365d',
        issuer: 'wordhunter.com',
        subject: 'userInfo'
      }, (error, token) => {
        if (error) reject(error);
        resolve(token);
      });
    });
  },
  saltEncrypt(password, salt) {
    return new Promise((resolve, reject) => {
      crypto.randomBytes(64, (error, buffer) => {
        if (error) reject(error);
        const secretkey = salt.toString('base64') || buffer.toString('base64');
        crypto.pbkdf2(password, secretkey, 180927, 64, 'sha512', (error, key) => {
          if (error) reject(error);
          resolve({ 
            encryptPassword: key.toString('base64'), 
            salt: secretkey
          });
        });
      });
    });
  }
};

module.exports = encryptCommon;