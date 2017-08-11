'use strict';

var util = require('util');
var express = require('express');
var router = express.Router();
var contacts = require('../models/contacts-memory');

function guid() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
  return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
    s4() + '-' + s4() + s4() + s4();
}

router.get('/', function(req, res, next) {
  contacts.keylist()
    .then(keylist => {
      var keyPromises = [];
      for (var key of keylist) {
        keyPromises.push(
          contacts.read(key)
          .then(contact => {
            return {
              contactid: contact.contactid,
              fullname: contact.lastname.toUpperCase() + ' ' + contact.firstname
            };
          })
        );
      }
      return Promise.all(keyPromises);
    })
    .then(contactlist => {
      res.render('contacts', {
        title: 'Contacts',
        contactlist: contactlist
      });
    })
    .catch(err => {
      next(err);
    });
});

module.exports = router;
