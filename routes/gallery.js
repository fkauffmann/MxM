var express = require('express');
var router = express.Router();

var fs = require('fs');

/* GET gallery/items page. */
router.get('/items', function(req, res, next) {
  var dir =  "./public/gallery/items"

  var imageURLs = [];
  var files = fs.readdirSync(dir);
  for (fn in files)
  {
    var imageURL = '/gallery/items/' + files[fn];
    if (imageURL.toLowerCase().indexOf(".jpg")>0) {
      imageURLs.push(imageURL);
      console.log(imageURL);
    }
  }


  res.render('gallery', {
    title: 'Items Gallery',
    imageURLs: imageURLs
  });
});

module.exports = router;
