var express = require('express');
var router = express.Router();
const { carregarPoliticos } = require('../models/politico_model');

router.get('/:cargo?', carregarPoliticos, async (req, res, next) => {
  res.render('explorar', { 
    title: 'Explorar',
    politicos: req.politicos,
    cargo: req.params.cargo,
    tipo: req.session.userTipo
  });
});

module.exports = router;