const mysql = require('../../mysql');

const SELECT_SUBSCRIB_LIST = `select subscribe_list from user_subscription where user_id = ?`;
const SELECT_SUBSCRIB_INFO = `select channel_id, title from channel_set_cms where channel_id in (?)`;

let connection;

function selectSubscribeList(userId) {
  return new Promise((resolve, reject) => {
    connection.query(SELECT_SUBSCRIB_LIST, [userId], (err, result) => {
      if (err)
        reject(err);
      else
        resolve(result)
    });
  });
}

function selectSubscribeInfo(subscribe_list) {
  return new Promise((resolve, reject) => {
    connection.query(SELECT_SUBSCRIB_INFO, [subscribe_list], (err, result) => {
      if (err)
        reject(err);
      else
        resolve(result)
    });
  });
}

module.exports = (req, res, next) => {
  mysql
    .getMicroWebOtherConncetion()
    .then(conn => {
      connection = conn;
      return selectSubscribeList("6d3eabe2749e8b941e5eefbdbbd718188")
    })
    .then(result => result[0].subscribe_list.split(','))
    .then(subscribe_list => selectSubscribeInfo(subscribe_list))
    .catch(err => {
      connection.release();
      next(err);
    });
}
