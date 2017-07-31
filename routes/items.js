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

// List items
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


// Add Item (create)
router.get('/add', (req, res, next) => {

	items.categorylist()
	.then(categorylist => {
		res.render('itemedit', {
	      title: "Add an Item",
	      docreate: true,
	      itemid: "",
	      item: undefined,
				categorylist: categorylist
	  });
	})
	.catch(err => { next(err); });

});

// Save Item (update)
router.post('/save', (req, res, next) => {
    var p;
    if (req.body.docreate === "create") {
        p = items.create(guid(),
                req.body.shortname, req.body.categoryid, req.body.maker, req.body.makerref, req.body.provider, req.body.providerurl, req.body.lastpurchasedate, req.body.price, req.body.vat, req.body.unit, req.body.width, req.body.height, req.body.diameter, req.body.picture, req.body.note, req.body.quantityinstock, req.body.quantityordered, req.body.stocklimitalert
							);
    } else {
        p = items.update(req.body.itemid,
						req.body.shortname, req.body.categoryid, req.body.maker, req.body.makerref, req.body.provider, req.body.providerurl, req.body.lastpurchasedate, req.body.price, req.body.vat, req.body.unit, req.body.width, req.body.height, req.body.diameter, req.body.picture, req.body.note, req.body.quantityinstock, req.body.quantityordered, req.body.stocklimitalert
					);
    }
    p.then(item => {
        //res.redirect('/categories/view?categoryid=' + req.body.categoryid);
        res.redirect('/items');
    })
    .catch(err => { next(err); });
});

// Edit Item (update)
router.get('/edit', (req, res, next) => {
    items.read(req.query.itemid)
    .then(item => {
		items.categorylist()
		.then(categorylist => {
			res.render('itemedit', {
	            title: item ? ("Edit " + item.shortname) : "Add an Item",
	            docreate: false,
	            itemid: req.query.itemid,
							categorylist : categorylist,
	            item: item
	        });
		})
    })
    .catch(err => { next(err); });
});

// Ask to delete Item (delete)
router.get('/delete', (req, res, next) => {
    items.read(req.query.itemid)
    .then(item => {
        res.render('itemdelete', {
            title: item ? item.shortname : "",
            itemid: req.query.itemid,
            item: item
        });
    })
    .catch(err => { next(err); });
});

// Really delete Item (delete)
router.post('/delete/confirm', (req, res, next) => {
    items.delete(req.body.itemid)
    .then(() => { res.redirect('/items'); })
    .catch(err => { next(err); });
});

module.exports = router;
