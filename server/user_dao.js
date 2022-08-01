'use strict';
const User = require('./user');

const db = require('./db.js');


const bcrypt = require('bcrypt');

const createUserObject = (row) => {
  return new User(row.id, row.name, row.email, row.hash, row.phoneNumber);
}

// Add User
exports.addUser = (user) => {
  return new Promise((resolve, reject) => {
    const sql = 'INSERT INTO users(email, name, hash, phoneNumber) VALUES(?, ?, ?, ?)';
    bcrypt.hash(user.password, 10, function (err, hash) {
      if (err) {
        reject(err);
        return;
      }
      db.run(sql, [user.email, user.name, hash, user.phoneNumber], function (err) {
        if (err) {
          reject(err);
          return;
        }
        resolve(this.lastID);
      });
    });
  });
}

// get User Names
exports.getUserNames = () => {
  return new Promise((resolve, reject) => {
      const sql = 'SELECT * FROM users';
      db.all(sql, [], (err, rows) => {
          if (err) {
              reject(err);
          }
          else if (rows.length === 0) {
              resolve(undefined);
          }
          else {
              const usernames = rows.map((user) => user.name);
              resolve(usernames);
          }
      });
  });
}

exports.getUser = (email, password) => {
  return new Promise((resolve, reject) => {
    const query = 'SELECT * FROM users WHERE email = ?';
    db.get(query, [email], (err, row) => {
      if (err) {
        reject(err); // DB error
        console.log('invalid email');
      }
      else if (row === undefined)
        resolve(undefined); // user not found
      else {
        bcrypt.compare(password, row.hash).then(matches => {
          if (matches) { // password matches
            resolve(createUserObject(row));
            console.log('matched password')
          }
          else {
            resolve(false); // password not matching
            console.log('not matched password')
          }

        });
      }
    });
  });
}

exports.getUserById = (id) => {
  return new Promise((resolve, reject) => {
    const query = 'SELECT * FROM users WHERE id = ?';
    db.get(query, [id], (err, row) => {
      if (err)
        reject(err);
      else if (row === undefined)
        resolve({ error: 'User not found.' });
      else {
        const user = createUserObject(row);
        resolve(user);
      }
    });
  });
};
