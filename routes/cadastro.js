const express = require('express');
const router = express.Router();
const db = require("../config/database");

router.post('/categoria', async (req, res) => {
  const nome = req.body.nome;

  const sqlVerifica = 'SELECT * FROM categorias_politicos WHERE nome = ?';
  db.query(sqlVerifica, [nome], (err, resultados) => {
    if (err) return res.status(500).json({ erro: 'Erro ao verificar categoria' });

    if (resultados.length > 0) {
      return res.status(400).json({ message: 'Categoria já cadastrada' });
    }
    db.query('INSERT INTO categorias_politicos (nome) VALUES (?)', [nome], err => {
    if (err) return res.status(500).json({ erro: 'Erro ao adicionar categoria' });
    });
  });
});

router.post('/politico', async (req, res) => {
  const { nome, partido, estado, municipio, categoria } = req.body;

  const sqlVerifica = 'SELECT * FROM politicos WHERE nome = ? AND partido = ? AND categoria_id = ?';
  db.query(sqlVerifica, [nome, partido, categoria], (err, resultados) => {
    if (err) return res.status(500).json({ erro: 'Erro ao verificar político' });

    if (resultados.length > 0) {
      return res.status(400).json({ message: 'Político já cadastrado' });
    }
    db.query('INSERT INTO politicos (nome, partido, estado, municipio, categoria_id) VALUES (?, ?, ?, ?, ?)', [nome, partido, estado, municipio, categoria], err => {
        if (err) return res.status(500).json({ erro: 'Erro ao adicionar político' });
    });
  });
});

module.exports = router;