var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  return res.json('Server is runninggggg')
});


module.exports = router;
