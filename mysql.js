const mysql = require('mysql');
const conf = require('./conf.js')[process.env.NODE_ENV || 'development'];

const cms = mysql.createPool(conf.mysql.cms);
const micro_web_other = mysql.createPool(conf.mysql.micro_web_other);
const micro_users_auth = mysql.createPool(conf.mysql.micro_users_auth);

function getCmsConncetion() {
  return new Promise((resolve, reject) => {
    cms.getConnection((err, connection) => {
      if (err) reject(err);
      else resolve(connection);
    });
  })
}

function getMicroWebOtherConncetion() {
  return new Promise((resolve, reject) => {
    micro_web_other.getConnection((err, connection) => {
      if (err) reject(err);
      else resolve(connection);
    });
  })
}

function getMicroUsersAuthConncetion() {
  return new Promise((resolve, reject) => {
    micro_users_auth.getConnection((err, connection) => {
      if (err) reject(err);
      else resolve(connection);
    });
  })
}

module.exports.cms = cms;
module.exports.micro_web_other = micro_web_other;
module.exports.micro_users_auth = micro_users_auth;
module.exports.getCmsConncetion = getCmsConncetion;
module.exports.getMicroWebOtherConncetion = getMicroWebOtherConncetion;
module.exports.getMicroUsersAuthConncetion = getMicroUsersAuthConncetion;
