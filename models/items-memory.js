'use strict';

const util    = require('util');
const sqlite3 = require('sqlite3');

const log     = require('debug')('notes:sqlite3-model');
const error   = require('debug')('notes:error');

const Item    = require('./Item');

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

exports.create = function(itemid,	shortname, categoryid, maker,	makerref,	provider,	providerurl, lastpurchasedate, price,	vat, unit, width,	height,	diameter,	picture, note, quantityinstock,	quantityordered, stocklimitalert) {
    return exports.connectDB().then(() => {
        var item = new Item(itemid,	shortname, categoryid, maker,	makerref,	provider,	providerurl, lastpurchasedate, price,	vat, unit, width,	height,	diameter,	picture, note, quantityinstock,	quantityordered, stocklimitalert);
        return new Promise((resolve, reject) => {
            db.run("INSERT INTO Item ( ItemID, ShortName, CategoryID, Maker, MakerRef, Provider, ProviderURL, LastPurchaseDate, Price, VAT, Unit, Width, Height, Diameter, Picture, Note, QuantityInStock, QuantityOrdered, StockLimitAlert ) "+
                "VALUES ( ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ? );",
                [ itemid,	shortname, categoryid, maker,	makerref,	provider,	providerurl, lastpurchasedate, price,	vat, unit, width,	height,	diameter,	picture, note, quantityinstock,	quantityordered, stocklimitalert ], err => {
                    if (err) reject(err);
                    else {
                        log('CREATE '+ util.inspect(item));
                        resolve(item);
                    }
            });
        });
    });
};

exports.update = function(itemid,	shortname, categoryid, maker,	makerref,	provider,	providerurl, lastpurchasedate, price,	vat, unit, width,	height,	diameter,	picture, note, quantityinstock,	quantityordered, stocklimitalert) {
    return exports.connectDB().then(() => {
        var item = new Item(itemid,	shortname, categoryid, maker,	makerref,	provider,	providerurl, lastpurchasedate, price,	vat, unit, width,	height,	diameter,	picture, note, quantityinstock,	quantityordered, stocklimitalert);
        return new Promise((resolve, reject) => {
            db.run("UPDATE Item "+
                "SET ShortName = ?, CategoryID = ?, Maker = ?, MakerRef = ?, Provider = ?, ProviderURL = ?, LastPurchaseDate = ?, Price = ?, VAT = ?, Unit = ?, Width = ?, Height = ?, Diameter = ?, Picture = ?, Note = ?, QuantityInStock = ?, QuantityOrdered = ?, StockLimitAlert = ? " +
                "WHERE ItemID = ?",
                [ shortname, categoryid, maker,	makerref,	provider,	providerurl, lastpurchasedate, price,	vat, unit, width,	height,	diameter,	picture, note, quantityinstock,	quantityordered, stocklimitalert, itemid ], err => {
                    if (err) reject(err);
                    else {
                        log('UPDATE '+ util.inspect(item));
                        resolve(item);
                    }
            });
        });
    });
};

exports.read = function(itemid) {
    return exports.connectDB().then(() => {
        return new Promise((resolve, reject) => {
            db.get("SELECT * FROM Item WHERE ItemID = ?",
                [ itemid ], (err, row) => {

                if (err) reject(err);
                // Fixed error left over from previous chapters
                else if (!row) {
                    reject(new Error("No item found for " + itemid));
                } else {
                    var item = new Item(row.ItemID,	row.ShortName, row.CategoryID, row.Maker,	row.MakerRef,	row.Provider,	row.ProviderURL, row.LastPurchaseDate, row.Price,	row.VAT, row.Unit, row.Width,	row.Height,	row.Diameter,	row.Picture, row.Note, row.QuantityInStock,	row.QuantityOrdered, row.StockLimitAlert);
                    log('READ '+ util.inspect(item));
                    resolve(item);
                }
            });
        });
    });
};

exports.delete = function(itemid) {
    return exports.connectDB().then(() => {
        return new Promise((resolve, reject) => {
            db.run("DELETE FROM Item WHERE ItemID = ?;",
                [ itemid ], err => {
                if (err) reject(err);
                else {
                    log('DELETE '+ itemid);
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
            db.each("SELECT ItemID FROM Item ORDER BY ShortName",
                (err, row) => {
                    if (err) reject(err);
                    else keyz.push(row.ItemID);
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
            db.get("select count(ItemID) as count from Item",
                (err, row) => {
                    if (err) return reject(err);
                    log('COUNT '+ util.inspect(row));
                    resolve(row.count);
                });
        });
    });
};
