const express = require('express');
const router = express.Router();
const db = require('../config/database');

router.get('/:id', verificarSessao, (req, res) => {
  const propostaId = req.params.id;

  db.query('SELECT * FROM propostas WHERE id = ?', [propostaId], (err, results) => {
    if (err || results.length === 0) {
      return res.status(404).json({ message: 'Proposta não encontrada' });
    }

    res.json(results[0]);
  });
});

module.exports = router;
