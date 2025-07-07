const db = require('../config/database');

function verificarAdmin(req, res, next) {
    if (req.session.userTipo === 'admin') {
        return next();
    }
    return res.status(403).send('Acesso restrito');
}

function buscarDashboard() {
  const sql = `
    SELECT
        (SELECT COUNT(*) FROM users) AS totalUsuarios,
        (SELECT COUNT(*) FROM propostas) AS totalPropostas,
        (SELECT COUNT(*) FROM avaliacoes) AS totalAvaliacoes,
        (SELECT COUNT(*) FROM favoritos) AS totalFavoritos;
    `;

  return new Promise((resolve, reject) => {
    db.query(sql, (err, resultados) => {
      if (err) reject(err);
      else resolve(resultados[0]);
    });
  });
}

async function carregarDashboard(req, res, next) {
  try {
    const dashboard = await buscarDashboard();

    req.dashboard = dashboard;
    next();
  } catch (err) {
    next(err);
  }
}

module.exports = {
    verificarAdmin,
    carregarDashboard
} 
