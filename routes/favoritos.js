const express = require('express');
const router = express.Router();
const db = require("../config/database");
const { carregarPropostas } = require('../models/proposta_model');
const { carregarPoliticos } = require('../models/politico_model');

router.get('/', carregarPropostas, carregarPoliticos, (req, res, next) => {
  res.render('favoritos', {
    title: 'Favoritos',
    propostas: req.propostas,
    politicos: req.politicos
    });
});

router.post('/proposta/:id', async (req, res) => {
  const userId = req.session.userId;
  const propostaId = req.params.id;

  if (!userId) return res.status(401).json({ erro: 'Não autorizado' });

  const sqlVerifica = 'SELECT * FROM favoritos WHERE user_id = ? AND proposta_id = ?';
  db.query(sqlVerifica, [userId, propostaId], (err, resultados) => {
    if (err) return res.status(500).json({ erro: 'Erro ao verificar favorito' });

    if (resultados.length > 0) {
      // já favoritou → remover
      db.query('DELETE FROM favoritos WHERE user_id = ? AND proposta_id = ?', [userId, propostaId], err => {
        if (err) return res.status(500).json({ erro: 'Erro ao remover favorito' });
        return res.json({ favoritado: false });
      });
    } else {
      // ainda não favoritou → adicionar
      db.query('INSERT INTO favoritos (user_id, proposta_id) VALUES (?, ?)', [userId, propostaId], err => {
        if (err) return res.status(500).json({ erro: 'Erro ao adicionar favorito' });
        return res.json({ favoritado: true });
      });
    }
  });
});

router.post('/politico/:id', async (req, res) => {
  const userId = req.session.userId;
  const politicoId = req.params.id;

  if (!userId) return res.status(401).json({ erro: 'Não autorizado' });

  const sqlVerifica = 'SELECT * FROM favoritos WHERE user_id = ? AND politico_id = ?';
  db.query(sqlVerifica, [userId, politicoId], (err, resultados) => {
    if (err) return res.status(500).json({ erro: 'Erro ao verificar favorito' });

    if (resultados.length > 0) {
      // já favoritou → remover
      db.query('DELETE FROM favoritos WHERE user_id = ? AND politico_id = ?', [userId, politicoId], err => {
        if (err) return res.status(500).json({ erro: 'Erro ao remover favorito' });
        return res.json({ favoritado: false });
      });
    } else {
      // ainda não favoritou → adicionar
      db.query('INSERT INTO favoritos (user_id, politico_id) VALUES (?, ?)', [userId, politicoId], err => {
        if (err) return res.status(500).json({ erro: 'Erro ao adicionar favorito' });
        return res.json({ favoritado: true });
      });
    }
  });
});

module.exports = router;