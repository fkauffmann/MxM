var express = require('express');
var router = express.Router();

// IMPORTANT: Your application HAS to respond to GET /health with status 200
// for OpenShift health monitoring
router.get('/', function(req, res, next) {
  res.writeHead(200);
  res.end();
});

module.exports = router;
