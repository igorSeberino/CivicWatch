const express = require('express');
const router = express.Router();
const propostaModel = require('../models/proposta_model');
const { carregarComentarios } = require('../models/proposta_model');

router.get('/:id', carregarComentarios, async function(req, res) {
  try {
    const propostaId = req.params.id;
    const usuarioId = req.session.userId;
    const proposta = await propostaModel.buscarPropostaPorId(propostaId, usuarioId);
    console.log(proposta);

    if (!proposta) return res.status(404).json({ message: 'Proposta não encontrada' });

    res.render('proposta', { 
      proposta,
      comentarios: req.comentarios,
      tipo: req.session.userTipo
     });
  } catch (error) {
    res.status(500).json({ message: 'Erro interno do servidor' });
  }
});

module.exports = router;
