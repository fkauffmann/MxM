'use strict';

var util = require('util');
var express = require('express');
var router = express.Router();
var categories = require('../models/categories-memory');

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
  categories.keylist()
    .then(keylist => {
      var keyPromises = [];
      for (var key of keylist) {
        keyPromises.push(
          categories.read(key)
          .then(category => {
            return {
              categoryid: category.categoryid,
              categoryname: category.categoryname
            };
          })
        );
      }
      return Promise.all(keyPromises);
    })
    .then(categorylist => {
      res.render('categories', {
        title: 'Categories',
        categorylist: categorylist
      });
    })
    .catch(err => {
      next(err);
    });
});

// Add Category (create)
router.get('/add', (req, res, next) => {
  res.render('categoryedit', {
    title: "Add a Category",
    docreate: true,
    categoryid: "",
    category: undefined
  });
});

// Save Category (update)
router.post('/save', (req, res, next) => {
  var p;
  if (req.body.docreate === "create") {
    p = categories.create(guid(),
      req.body.categoryname, req.body.reusable ? true : false);
  } else {
    p = categories.update(req.body.categoryid,
      req.body.categoryname, req.body.reusable ? true : false);
  }
  p.then(category => {
      //res.redirect('/categories/view?categoryid=' + req.body.categoryid);
      res.redirect('/categories');
    })
    .catch(err => {
      next(err);
    });
});

// Read Category (read)
router.get('/view', (req, res, next) => {
  categories.read(req.query.categoryid)
    .then(category => {
      res.render('categoryview', {
        title: category ? ("View Category {" + category.categoryname + "}") : "",
        categoryid: req.query.categoryid,
        category: category
      });
    })
    .catch(err => {
      next(err);
    });
});

// Edit Category (update)
router.get('/edit', (req, res, next) => {
  categories.read(req.query.categoryid)
    .then(category => {
      res.render('categoryedit', {
        title: category ? ("Edit Category {" + category.categoryname + "}") : "Add a Category",
        docreate: false,
        categoryid: req.query.categoryid,
        category: category
      });
    })
    .catch(err => {
      next(err);
    });
});

// Ask to delete Category (delete)
router.get('/delete', (req, res, next) => {
  categories.read(req.query.categoryid)
    .then(category => {
      res.render('categorydelete', {
        title: category ? ("Delete Category {" + category.categoryname + "}") : "",
        categoryid: req.query.categoryid,
        category: category
      });
    })
    .catch(err => {
      next(err);
    });
});

// Really delete Category (delete)
router.post('/delete/confirm', (req, res, next) => {
  categories.delete(req.body.categoryid)
    .then(() => {
      res.redirect('/categories');
    })
    .catch(err => {
      next(err);
    });
});

module.exports = router;
