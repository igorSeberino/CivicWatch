const express = require('express');
const router = express.Router();
const db = require('../config/database');

// Rota de registro
router.post('/register', async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Verifica se o usuário já existe
        db.query('SELECT * FROM users WHERE email = ?', [email], (err, results) => {
            if (err) {
                console.error('Erro ao verificar usuário:', err);
                return res.status(500).json({ message: 'Erro interno do servidor' });
            }

            if (results.length > 0) {
                return res.status(400).json({ message: 'Email já cadastrado' });
            }

            // Insere o novo usuário
            db.query(
                'INSERT INTO users (name, email, password) VALUES (?, ?, ?)',
                [name, email, password],
                (err, results) => {
                    if (err) {
                        console.error('Erro ao cadastrar usuário:', err);
                        return res.status(500).json({ message: 'Erro ao cadastrar usuário' });
                    }
                    res.status(201).json({ message: 'Usuário cadastrado com sucesso' });
                }
            );
        });
    } catch (error) {
        console.error('Erro no registro:', error);
        res.status(500).json({ message: 'Erro interno do servidor' });
    }
});

// Rota de login
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        // Busca o usuário pelo email e senha
        db.query('SELECT * FROM users WHERE email = ? AND password = ?', [email, password], (err, results) => {
            if (err) {
                console.error('Erro ao buscar usuário:', err);
                return res.status(500).json({ message: 'Erro interno do servidor' });
            }

            if (results.length === 0) {
                return res.status(401).json({ message: 'Email ou senha inválidos' });
            }

            const user = results[0];

            // Retorna os dados do usuário
            res.json({
                user: {
                    id: user.id,
                    name: user.name,
                    email: user.email
                }
            });
        });
    } catch (error) {
        console.error('Erro no login:', error);
        res.status(500).json({ message: 'Erro interno do servidor' });
    }
});

module.exports = router;
