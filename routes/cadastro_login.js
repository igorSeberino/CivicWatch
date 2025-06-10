var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('cadastro_login', { title: 'Express' });
});

module.exports = router;