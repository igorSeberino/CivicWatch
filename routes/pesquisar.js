var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('pesquisar', { title: 'Pesquisar' });
});

module.exports = router;