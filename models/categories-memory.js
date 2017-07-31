'use strict';

const util    = require('util');
const sqlite3 = require('sqlite3');

const log     = require('debug')('notes:sqlite3-model');
const error   = require('debug')('notes:error');

const Category    = require('./Category');

sqlite3.verbose();
var db; // store the database connection here

exports.connectDB = function() {
    return new Promise((resolve, reject) => {
        if (db) return resolve(db);
        var dbfile = process.env.SQLITE_FILE || "./database/mxm.db";
        db = new sqlite3.Database(dbfile,
            sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE,
            err => {
                if (err) reject(err);
                else {
                    log('Opened SQLite3 database '+ dbfile);
                    resolve(db);
                }
            });
    });
};

exports.create = function(categoryid, categoryname, reusable) {
    return exports.connectDB().then(() => {
        var category = new Category(categoryid, categoryname, reusable);
        return new Promise((resolve, reject) => {
            db.run("INSERT INTO Category ( CategoryID, CategoryName, Reusable ) "+
                "VALUES ( ?, ? , ? );",
                [ categoryid, categoryname, reusable ], err => {
                    if (err) reject(err);
                    else {
                        log('CREATE '+ util.inspect(category));
                        resolve(category);
                    }
            });
        });
    });
};

exports.update = function(categoryid, categoryname, reusable) {
    return exports.connectDB().then(() => {
        var category = new Category(categoryid, categoryname, reusable);
        return new Promise((resolve, reject) => {
            db.run("UPDATE Category "+
                "SET CategoryName = ?, Reusable = ? "+
                "WHERE CategoryID = ?",
                [ categoryname, reusable, categoryid ], err => {
                    if (err) reject(err);
                    else {
                        log('UPDATE '+ util.inspect(category));
                        resolve(category);
                    }
            });
        });
    });
};

exports.read = function(categoryid) {
    return exports.connectDB().then(() => {
        return new Promise((resolve, reject) => {
            db.get("SELECT * FROM Category WHERE CategoryID = ?",
                [ categoryid ], (err, row) => {

                if (err) reject(err);
                // Fixed error left over from previous chapters
                else if (!row) {
                    reject(new Error("No category found for " + categoryid));
                } else {
                    var category = new Category(row.CategoryID, row.CategoryName, row.Reusable);
                    log('READ '+ util.inspect(category));
                    resolve(category);
                }
            });
        });
    });
};

exports.delete = function(categoryid) {
    return exports.connectDB().then(() => {
        return new Promise((resolve, reject) => {
            db.run("DELETE FROM Category WHERE CategoryID = ?;",
                [ categoryid ], err => {
                if (err) reject(err);
                else {
                    log('DELETE '+ categoryid);
                    resolve();
                }
            });
        });
    });
};

exports.keylist = function() {
    return exports.connectDB().then(() => {
        return new Promise((resolve, reject) => {
            var keyz = [];
            db.each("SELECT CategoryID FROM Category ORDER BY CategoryName",
                (err, row) => {
                    if (err) reject(err);
                    else keyz.push(row.CategoryID);
                },
                (err, num) => {
                    if (err) reject(err);
                    else {
                        log('KEYLIST '+ num +' '+ util.inspect(keyz));
                        resolve(keyz);
                    }
                });
        });
    });
};

exports.count = function() {
    return exports.connectDB().then(() => {
        return new Promise((resolve, reject) => {
            db.get("select count(CategoryID) as count from Category",
                (err, row) => {
                    if (err) return reject(err);
                    log('COUNT '+ util.inspect(row));
                    resolve(row.count);
                });
        });
    });
};
