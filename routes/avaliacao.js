const express = require('express');
const router = express.Router();
const db = require("../config/database");

router.post('/:id', async (req, res) => {
  const userId = req.session.userId;
  const propostaId = req.params.id;
  const nota = req.body.nota;

  if (!userId) return res.status(401).json({ erro: 'Não autorizado' });

    db.query('INSERT INTO avaliacoes (user_id, proposta_id, nota) VALUES (?, ?, ?)', [userId, propostaId, nota], err => {
        if (err) return res.status(500).json({ erro: 'Erro ao adicionar avaliação' });
    });
});

module.exports = router;