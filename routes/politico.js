const express = require('express');
const router = express.Router();
const { buscarPoliticoPorId } = require('../models/politico_model');
const { carregarPropostasPorPolitico } = require('../models/proposta_model');

router.get('/:id', carregarPropostasPorPolitico, async function(req, res) {
  try {
    const politicoId = req.params.id;
    const usuarioId = req.session.userId;
    const politico = await buscarPoliticoPorId(politicoId, usuarioId);

    if (!politico) return res.status(404).json({ message: 'Politico não encontrado' });

    res.render('politico', {
        politico,
        propostas: req.propostas,
        tipo: req.session.userTipo
    });
  } catch (error) {
    res.status(500).json({ message: 'Erro interno do servidor' });
  }
});

module.exports = router;
