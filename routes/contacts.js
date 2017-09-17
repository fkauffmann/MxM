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

// Add Contact (create)
router.get('/add', (req, res, next) => {
  res.render('contactedit', {
    title: "Add a Contact",
    docreate: true,
    contactid: "",
    contact: undefined,
		contacttypelist: config.contactTypes        
  });
});

// Save Category (update)
router.post('/save', (req, res, next) => {
  var p;
  if (req.body.docreate === "create") {
    p = contacts.create(guid(),
      req.body.firstname, req.body.lastname, req.body.contacttype, req.body.enterprise, req.body.job, req.body.meetat, req.body.meetdate, req.body.street, req.body.postcode, req.body.city, req.body.country, req.body.mail, req.body.website, req.body.phone, req.body.cancontact ? true : false, req.body.note);
  } else {
    p = categories.update(req.body.contactid,
      req.body.firstname, req.body.lastname, req.body.contacttype, req.body.enterprise, req.body.job, req.body.meetat, req.body.meetdate, req.body.street, req.body.postcode, req.body.city, req.body.country, req.body.mail, req.body.website, req.body.phone, req.body.cancontact ? true : false, req.body.note);
  }
  p.then(contact => {
      //res.redirect('/categories/view?categoryid=' + req.body.categoryid);
      res.redirect('/contacts');
    })
    .catch(err => {
      next(err);
    });
});

// Read Category (read)
router.get('/view', (req, res, next) => {
  contacts.read(req.query.contactid)
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

      res.render('contactview', {
        title: contact ? ("View Contact {" + fullname + "}") : "",
        contactid: req.query.contactid,
        contact: contact,
		    contacttypelist: config.contactTypes
      });
    })
    .catch(err => {
      next(err);
    });
});

// Edit Contact (update)
router.get('/edit', (req, res, next) => {
  contacts.read(req.query.contactid)
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

      res.render('contactedit', {
        title: contact ? ("Edit Contact {" + fullname + "}") : "Add a Contact",
        docreate: false,
        contactid: req.query.contactid,
        contact: contact,
		    contacttypelist: config.contactTypes
      });
    })
    .catch(err => {
      next(err);
    });
});

// Ask to delete Contact (delete)
router.get('/delete', (req, res, next) => {
  contacts.read(req.query.contactid)
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

      res.render('contactdelete', {
        title: contact ? ("Delete Contact {" + fullname + "}") : "",
        contactid: req.query.contactid,
        contact: contact
      });
    })
    .catch(err => {
      next(err);
    });
});

// Really delete Contact (delete)
router.post('/delete/confirm', (req, res, next) => {
  contacts.delete(req.body.contactid)
    .then(() => {
      res.redirect('/contacts');
    })
    .catch(err => {
      next(err);
    });
});

module.exports = router;
