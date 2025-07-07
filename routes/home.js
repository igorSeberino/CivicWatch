var express = require('express');
var router = express.Router();
const { carregarPropostas } = require('../models/proposta_model');

/* GET home page. */
router.get('/', carregarPropostas, (req, res, next) => {
  res.render('home', {
    title: 'Civic Watch',
    propostas: req.propostas,
    tipo: req.session.userTipo
    });
});

module.exports = router;
