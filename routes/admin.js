const express = require('express');
const router = express.Router();
const db = require('../config/database');
const { verificarAdmin, carregarDashboard } = require('../models/admin_model');

router.get('/:aba?', verificarAdmin, carregarDashboard, async (req, res) => {
    try {
        res.render('admin', {
            dashboard: req.dashboard,
            aba: req.params.aba,
            tipo: req.session.userTipo
        });
    } catch (err) {
        console.error(err);
        res.status(500).send('Erro ao carregar dashboard');
    }
});

module.exports = router;
