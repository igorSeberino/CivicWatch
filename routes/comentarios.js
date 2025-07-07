const express = require('express');
const router = express.Router();
const db = require("../config/database");

router.post('/:id', async (req, res) => {
  const userId = req.session.userId;
  const propostaId = req.params.id;
  const texto = req.body.texto;

  if (!userId) return res.status(401).json({ erro: 'Não autorizado' });

  db.query('INSERT INTO comentarios (user_id, proposta_id, texto) VALUES (?, ?, ?)', [userId, propostaId, texto], err => {
      if (err) return res.status(500).json({ erro: 'Erro ao adicionar comentário' });
      return res.redirect(`/proposta/${propostaId}`);
  });
});

router.post('/excluir/:id', async (req, res) => {
  const id = req.params.id;
  db.query('DELETE FROM comentarios WHERE id = ?', [id], err => {
      if (err) return res.status(500).json({ erro: 'Erro ao excluir comentário' });
  });
});

module.exports = router;