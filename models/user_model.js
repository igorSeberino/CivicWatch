const jwt = require('jsonwebtoken');
const secret = process.env.JWT_SECRET;
const db = require('../config/database');

// Gera um token JWT para um usuário
function gerarToken(user) {
  return jwt.sign({ id: user.id, name: user.name, email: user.email }, secret, {
    expiresIn: '2h'
  });
}

// Verifica e decodifica o token
function verificarToken(token) {
  return jwt.verify(token, secret);
}

async function cadastro(name, email, password) {
  return new Promise((resolve, reject) => {
    db.query('SELECT * FROM users WHERE email = ?', [email], (err, results) => {
      if (err) return reject({ type: 'db', message: 'Erro ao verificar email', error: err });

      if (results.length > 0) {
        return reject({ type: 'exists', message: 'Email já cadastrado' });
      }

      db.query(
        'INSERT INTO users (name, email, password) VALUES (?, ?, ?)',
        [name, email, password],
        (err, results) => {
          if (err) return reject({ type: 'db', message: 'Erro ao cadastrar usuário', error: err });

          resolve(results.insertId);
        }
      );
    });
  });
};

module.exports = {
  gerarToken,
  verificarToken,
  cadastro
};
