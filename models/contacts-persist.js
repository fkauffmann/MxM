'use strict';

const util = require('util');
const sqlite3 = require('sqlite3');

const log = require('debug')('notes:sqlite3-model');
const error = require('debug')('notes:error');

const Contact = require('./Contact');

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

exports.create = function(contactid, firstname, lastname, contacttype, enterprise, job, meetat, meetdate, street, postcode, city, country, mail, website, phone, cancontact, note) {
  return exports.connectDB().then(() => {
    var contact = new Contact(contactid, firstname, lastname, contacttype, enterprise, job, meetat, meetdate, street, postcode, city, country, mail, website, phone, cancontact, note);
    return new Promise((resolve, reject) => {
      db.run("INSERT INTO Contact ( ContactID, FirstName, LastName, ContactType, Enterprise, Job, MeetAt, MeetDate, Street, PostCode, City, Country, Mail, Website, Phone, CanContact, Note ) " +
        "VALUES ( ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ? );", [contactid, firstname, lastname, contacttype, enterprise, job, meetat, meetdate, street, postcode, city, country, mail, website, phone, cancontact, note], err => {
          if (err) reject(err);
          else {
            log('CREATE ' + util.inspect(contact));
            resolve(contact);
          }
        });
    });
  });
};

exports.update = function(contactid, firstname, lastname, contacttype, enterprise, job, meetat, meetdate, street, postcode, city, country, mail, website, phone, cancontact, note) {
  return exports.connectDB().then(() => {
    var contact = new Contact(contactid, firstname, lastname, contacttype, enterprise, job, meetat, meetdate, street, postcode, city, country, mail, website, phone, cancontact, note);
    return new Promise((resolve, reject) => {
      db.run("UPDATE Contact " +
        "SET FirstName = ?, LastName = ?, ContactType = ?, Enterprise = ?, Job = ?, MeetAt = ?, MeetDate = ?, Street = ?, PostCode = ?, City = ?, Country = ?, Mail = ?, Website = ?, Phone = ?, CanContact = ?, Note = ? " +
        "WHERE ContactID = ?", [firstname, lastname, contacttype, enterprise, job, meetat, meetdate, street, postcode, city, country, mail, website, phone, cancontact, note, contactid], err => {
          if (err) reject(err);
          else {
            log('UPDATE ' + util.inspect(contact));
            resolve(contact);
          }
        });
    });
  });
};

exports.read = function(contactid) {
  return exports.connectDB().then(() => {
    return new Promise((resolve, reject) => {

      db.get("SELECT * FROM Contact WHERE ContactID = ?", [contactid], (err, row) => {

        if (err) reject(err);
        // Fixed error left over from previous chapters
        else if (!row) {
          reject(new Error("No item found for " + contactid));
        } else {
          var contact = new Contact(row.ContactID, row.FirstName, row.LastName, row.ContactType, row.Enterprise, row.Job, row.MeetAt, row.MeetDate, row.Street, row.PostCode, row.City, row.Country, row.Mail, row.Website, row.Phone, row.CanContact, row.Note);
          log('READ ' + util.inspect(contact));
          resolve(contact);
        }
      });
    });
  });
};

exports.delete = function(contactid) {
  return exports.connectDB().then(() => {
    return new Promise((resolve, reject) => {
      db.run("DELETE FROM Contact WHERE ContactID = ?;", [contactid], err => {
        if (err) reject(err);
        else {
          log('DELETE ' + contactid);
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
      db.each("SELECT ContactID FROM Contact ORDER BY LastName, FirstName, Enterprise",
        (err, row) => {
          if (err) reject(err);
          else keyz.push(row.ContactID);
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
      db.get("select count(ContactID) as count from Contact",
        (err, row) => {
          if (err) return reject(err);
          log('COUNT ' + util.inspect(row));
          resolve(row.count);
        });
    });
  });
};
