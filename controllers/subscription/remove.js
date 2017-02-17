const mysql = require('../../mysql');

const SELECT_SUBSCRIB_LIST = `select subscribe_list from user_subscription where user_id = ?`;
const UPDATE_SUBSCRIB_INFO = `update user_subscription set channel_id= ? where user_id = ?`;

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

function updateSubscribeInfo(subscribe_list, userId) {
  return new Promise((resolve, reject) => {
    connection.query(SELECT_SUBSCRIB_INFO, [subscribe_list, userId], (err, result) => {
      if (err)
        reject(err);
      else
        resolve(result)
    });
  });
}

module.exports = (req, res, next) => {

  console.log(req.body)

  mysql
    .getMicroWebOtherConncetion()
    .then(conn => {
      connection = conn;
      return selectSubscribeList("6d3eabe2749e8b941e5eefbdbbd718188")
    })
    .then(result => result[0].subscribe_list.split(','))
    .then(old_list => old_list.filter(item => item != req.body))
    .then(subscribe_list => updateSubscribeInfo(subscribe_list, "6d3eabe2749e8b941e5eefbdbbd718188"))
    .catch(err => {
      connection.release();
      next(err);
    });
}
