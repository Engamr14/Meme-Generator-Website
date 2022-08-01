'use strict'
const db = require('./db.js');

// Add Meme
exports.addMeme = (meme) => {
    return new Promise((resolve, reject) => {
        const sql = 'INSERT INTO Memes(user, title, imgID, text1, text2, fontFamily, fontSize, fontColor, visibility) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?)';
        db.run(sql, [meme.user, meme.title, meme.imgID, meme.text1, meme.text2, meme.fontFamily, meme.fontSize, meme.fontColor, meme.visibility], function (err) {
            if (err) {
                reject(err);
                return;
            }
            resolve(this.lastID);
        });
    });
}

// get All Memes
exports.getAllMemes = () => {
    return new Promise((resolve, reject) => {
        const sql = 'SELECT * FROM Memes';
        db.all(sql, [], (err, rows) => {
            if (err) {
                reject(err);
            }
            else if (rows.length === 0) {
                resolve(undefined);
            }
            else {
                const memes = rows.map((meme) => ({
                    key: meme.key, user: meme.user, title: meme.title, imgID: meme.imgID, text1: meme.text1, text2: meme.text2,
                    fontFamily: meme.fontFamily, fontSize: meme.fontSize, fontColor: meme.fontColor, visibility: meme.visibility
                }));
                resolve(memes);
            }
        });
    });
}

// get Public Memes
exports.getPublicMemes = () => {
    return new Promise((resolve, reject) => {
        const sql = 'SELECT * FROM Memes WHERE visibility = ?';
        db.all(sql, ['Public'], (err, rows) => {
            if (err) {
                reject(err);
            }
            else if (rows.length === 0) {
                resolve(undefined);
            }
            else {
                const memes = rows.map((meme) => ({
                    key: meme.key, user: meme.user, title: meme.title, imgID: meme.imgID, text1: meme.text1, text2: meme.text2,
                    fontFamily: meme.fontFamily, fontSize: meme.fontSize, fontColor: meme.fontColor, visibility: meme.visibility
                }));
                resolve(memes);
            }
        });
    });
}

// get Memes by user
exports.getMemesByUser = (user) => {
    return new Promise((resolve, reject) => {
        const sql = 'SELECT * FROM Memes WHERE user = ?';
        db.all(sql, [user], (err, rows) => {
            if (err) {
                reject(err);
            }
            else if (rows.length === 0) {
                resolve(undefined);
            }
            else {
                const memes = rows.map((meme) => ({
                    key: meme.key, user: meme.user, title: meme.title, imgID: meme.imgID, text1: meme.text1, text2: meme.text2,
                    fontFamily: meme.fontFamily, fontSize: meme.fontSize, fontColor: meme.fontColor, visibility: meme.visibility
                }));
                resolve(memes);
            }
        });
    });
}

// delete Meme
exports.deleteMeme = (key) => {
    return new Promise((resolve, reject) => {
        const query = 'DELETE FROM Memes WHERE key = ?';
        db.run(query, [key], (err) => {
            if (err)
                reject(err);
            else
                resolve(null);
        })
    });
}