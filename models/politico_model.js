const db = require('../config/database');

function buscarPoliticoPorId(politicoId) {
  const sql = `
    SELECT 
      pol.id,
      pol.nome,
      pol.partido,
      pol.estado,
      pol.municipio,
      cat.nome AS cargo
    FROM politicos pol
    LEFT JOIN categorias_politicos cat ON pol.categoria_id = cat.id
    WHERE pol.id = ?
  `;

  return new Promise((resolve, reject) => {
    db.query(sql, [politicoId], (err, resultados) => {
      if (err) return reject(err);
      if (resultados.length === 0) return resolve(null);

      resolve(resultados[0]);
    });
  });
}

module.exports = {
  buscarPoliticoPorId
};
