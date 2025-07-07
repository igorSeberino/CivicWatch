const express = require('express');
const router = express.Router();
const db = require('../config/database');
const { verificarAdmin, carregarDashboard } = require('../models/admin_model');
const { buscarCategorias } = require('../models/politico_model');
const { buscarTodosOsPerfis } = require('../models/perfil_model');

router.get('/:aba?', verificarAdmin, carregarDashboard, async (req, res) => {
    const categorias = await buscarCategorias();
    const perfis = await buscarTodosOsPerfis();
    const busca = req.query.busca;
    try {
        res.render('admin', {
            dashboard: req.dashboard,
            aba: req.params.aba,
            busca: busca,
            tipo: req.session.userTipo,
            categorias: categorias,
            perfis: perfis
        });
    } catch (err) {
        console.error(err);
        res.status(500).send('Erro ao carregar dashboard');
    }
});

router.post('/excluirperfil/:id', async (req, res) => {
    const userId = req.params.id;

    db.query('DELETE FROM users WHERE id = ?', [userId], err => {
        if (err) return res.status(500).json({ erro: 'Erro ao excluir perfil' });
    });
});

module.exports = router;
