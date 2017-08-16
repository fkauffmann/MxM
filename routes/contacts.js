'use strict';

var util = require('util');
var express = require('express');
var router = express.Router();
var contacts = require('../models/contacts-persist');

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
						var fullname = "";

						if (contact.lastname != null && contact.firstname != null) {
							fullname = contact.lastname.toUpperCase() + ' ' + contact.firstname;
						}
						if (contact.lastname != null && contact.firstname == null) {
							fullname = contact.lastname.toUpperCase();
						}
						if (contact.lastname == null && contact.firstname != null) {
							fullname = contact.firstname;
						}
						if (contact.lastname == null && contact.firstname == null) {
							fullname = contact.enterprise;
						}

            return {
              contactid: contact.contactid,
              fullname: fullname
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
