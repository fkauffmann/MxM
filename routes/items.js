'use strict';

var util = require('util');
var express = require('express');
var router = express.Router();
var items = require('../models/items-memory');

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
  items.keylist()
  .then(keylist => {
      var keyPromises = [];
      for (var key of keylist) {
          keyPromises.push(
              items.read(key)
              .then(item => {
                  return { itemid: item.itemid, shortname: item.shortname };
              })
          );
      }
      return Promise.all(keyPromises);
  })
  .then(itemlist => {
    res.render('items', { title: 'Items', itemlist: itemlist });
  })
  .catch(err => { next(err); });
});

module.exports = router;
