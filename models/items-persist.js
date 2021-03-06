'use strict';

const util = require('util');
const sqlite3 = require('sqlite3');

const log = require('debug')('notes:sqlite3-model');
const error = require('debug')('notes:error');

const Item = require('./Item');
const Category = require('./Category');
const Supplier = require('./Supplier');

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
          log('Opened SQLite3 database ' + dbfile);
          resolve(db);
        }
      });
  });
};

exports.create = function(itemid, shortname, categoryid, maker, makerref, contactid, providerurl, lastpurchasedate, price, unit, width, height, diameter, picture, note, quantityinstock, stocklimitalert) {
  return exports.connectDB().then(() => {
    var item = new Item(itemid, shortname, categoryid, maker, makerref, contactid, providerurl, lastpurchasedate, price, unit, width, height, diameter, picture, note, quantityinstock,  stocklimitalert);
    return new Promise((resolve, reject) => {
      db.run("INSERT INTO Item ( ItemID, ShortName, CategoryID, Maker, MakerRef, ContactID, ProviderURL, LastPurchaseDate, Price, Unit, Width, Height, Diameter, Picture, Note, QuantityInStock, StockLimitAlert ) " +
        "VALUES ( ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ? );", [itemid, shortname, categoryid, maker, makerref, contactid, providerurl, lastpurchasedate, price, unit, width, height, diameter, picture, note, quantityinstock, stocklimitalert], err => {
          if (err) reject(err);
          else {
            log('CREATE ' + util.inspect(item));
            resolve(item);
          }
        });
    });
  });
};

exports.update = function(itemid, shortname, categoryid, maker, makerref, contactid, providerurl, lastpurchasedate, price, unit, width, height, diameter, picture, note, quantityinstock, stocklimitalert) {
  return exports.connectDB().then(() => {
    var item = new Item(itemid, shortname, categoryid, maker, makerref, contactid, providerurl, lastpurchasedate, price, unit, width, height, diameter, picture, note, quantityinstock, stocklimitalert);
    return new Promise((resolve, reject) => {
      db.run("UPDATE Item " +
        "SET ShortName = ?, CategoryID = ?, Maker = ?, MakerRef = ?, ContactID = ?, ProviderURL = ?, LastPurchaseDate = ?, Price = ?, Unit = ?, Width = ?, Height = ?, Diameter = ?, Picture = ?, Note = ?, QuantityInStock = ?, StockLimitAlert = ? " +
        "WHERE ItemID = ?", [shortname, categoryid, maker, makerref, contactid, providerurl, lastpurchasedate, price, unit, width, height, diameter, picture, note, quantityinstock, stocklimitalert, itemid], err => {
          if (err) reject(err);
          else {
            log('UPDATE ' + util.inspect(item));
            resolve(item);
          }
        });
    });
  });
};

exports.read = function(itemid) {
  return exports.connectDB().then(() => {
    return new Promise((resolve, reject) => {

      db.get("SELECT * FROM Item WHERE ItemID = ?", [itemid], (err, row) => {

        if (err) reject(err);
        // Fixed error left over from previous chapters
        else if (!row) {
          reject(new Error("No item found for " + itemid));
        } else {
          var item = new Item(row.ItemID, row.ShortName, row.CategoryID, row.Maker, row.MakerRef, row.ContactID, row.ProviderURL, row.LastPurchaseDate, row.Price, row.Unit, row.Width, row.Height, row.Diameter, row.Picture, row.Note, row.QuantityInStock, row.StockLimitAlert);
          log('READ ' + util.inspect(item));
          resolve(item);
        }
      });

    });
  });
};

exports.delete = function(itemid) {
  return exports.connectDB().then(() => {
    return new Promise((resolve, reject) => {
      db.run("DELETE FROM Item WHERE ItemID = ?;", [itemid], err => {
        if (err) reject(err);
        else {
          log('DELETE ' + itemid);
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
            log('KEYLIST ' + num + ' ' + util.inspect(keyz));
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
          log('COUNT ' + util.inspect(row));
          resolve(row.count);
        });
    });
  });
};

exports.categorylist = function() {
  return exports.connectDB().then(() => {
    return new Promise((resolve, reject) => {
      db.all("select * from Category order by CategoryName",
        (err, rows) => {
          if (err) return reject(err);

          var categorylist = [];

          rows.forEach(function(row) {
            var category = new Category(row.CategoryID, row.CategoryName, row.Reusable);
            categorylist.push(category);
          })

          resolve(categorylist);
        });
    });
  });
};

// Returns the list of all available suppliers
exports.supplierlist = function() {
  return exports.connectDB().then(() => {
    return new Promise((resolve, reject) => {
      db.all("select ContactID, Enterprise from Contact where ContactType='Supplier' order by Enterprise",
        (err, rows) => {
          if (err) return reject(err);

          var supplierlist = [];

          rows.forEach(function(row) {
            var supplier = new Supplier(row.ContactID, row.Enterprise);
            supplierlist.push(supplier);
          })

          resolve(supplierlist);
        });
    });
  });
};
