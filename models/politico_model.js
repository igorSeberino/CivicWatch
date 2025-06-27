const db = require('../config/database');

function buscarPoliticos(usuarioId) {
  const sql = `
    SELECT 
      p.id,
      p.nome,
      p.partido,
      p.estado,
      p.municipio,
      c.nome AS cargo,
      CASE WHEN f.user_id IS NOT NULL THEN 1 ELSE 0 END AS favoritou
    FROM politicos p
    LEFT JOIN categorias_politicos c ON p.categoria_id = c.id
    LEFT JOIN favoritos f 
      ON p.id = f.politico_id AND f.user_id = ?
  `;

  return new Promise((resolve, reject) => {
    db.query(sql, [usuarioId], (err, resultados) => {
      if (err) return reject(err);
      resolve(resultados.map(p => ({
        ...p,
        favoritou: !!p.favoritou
      })));
    });
  });
}

function buscarPoliticoPorId(politicoId, userId) {
  const sql = `
    SELECT 
      pol.id,
      pol.nome,
      pol.partido,
      pol.estado,
      pol.municipio,
      cat.nome AS cargo,
      CASE WHEN fav.user_id IS NOT NULL THEN 1 ELSE 0 END AS favoritou
    FROM politicos pol
    LEFT JOIN categorias_politicos cat ON pol.categoria_id = cat.id
    LEFT JOIN favoritos fav 
      ON fav.politico_id = pol.id AND fav.user_id = ?
    WHERE pol.id = ?
  `;

  return new Promise((resolve, reject) => {
    db.query(sql, [userId, politicoId], (err, resultados) => {
      if (err) return reject(err);
      if (resultados.length === 0) return resolve(null);

      const politico = resultados[0];
      politico.favoritou = !!politico.favoritou; // converter 1/0 para true/false
      resolve(politico);
    });
  });
}

async function carregarPoliticos(req, res, next) {
  try {
    const usuarioId = req.session.userId;
    const politicos = await buscarPoliticos(usuarioId);
    req.politicos = politicos;
    next();
  } catch (err) {
    next(err);
  }
}

module.exports = {
  buscarPoliticoPorId,
  carregarPoliticos
};
