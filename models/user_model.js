const jwt = require('jsonwebtoken');
const secret = process.env.JWT_SECRET;

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

module.exports = {
  gerarToken,
  verificarToken
};
