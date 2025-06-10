var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('perfil_usuario', { title: 'Perfil de Usuário' });
});

module.exports = router;