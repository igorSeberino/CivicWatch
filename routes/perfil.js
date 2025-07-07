const express = require('express');
const router = express.Router();
const perfilModel = require('../models/perfil_model');
const { carregarPropostas } = require('../models/proposta_model');

router.get('/', carregarPropostas, async (req, res) => {
    try {
        const usuarioId = req.session.userId;
        const perfil = await perfilModel.buscarPerfilPorId(usuarioId);

        if (!perfil) {
            return res.status(404).send('Usuário não encontrado');
        }

        res.render('perfil', {
           user: perfil,
           propostas: req.propostas,
           tipo: req.session.userTipo
          });
    } catch (err) {
        console.error('Erro ao carregar perfil:', err);
        res.status(500).send('Erro interno do servidor');
    }
});

module.exports = router;
