const db = require('../config/database');

function buscarPropostas(usuarioId) {
  const sql = `
    SELECT
      p.id,
      p.titulo,
      p.descricao,
      pol.nome AS politico_nome,
      cat.nome AS politico_cargo,
      pol.partido AS politico_partido,
      COALESCE(AVG(a.nota), 0) AS media_avaliacoes,
      CASE WHEN f.user_id IS NOT NULL THEN 1 ELSE 0 END AS favoritou,
      CASE WHEN av_user.user_id IS NOT NULL THEN 1 ELSE 0 END AS avaliou
    FROM propostas p
    JOIN politicos pol ON p.politico_id = pol.id
    LEFT JOIN categorias_politicos cat ON pol.categoria_id = cat.id
    LEFT JOIN avaliacoes a ON a.proposta_id = p.id
    LEFT JOIN favoritos f ON f.proposta_id = p.id AND f.user_id = ?
    LEFT JOIN avaliacoes av_user ON av_user.proposta_id = p.id AND av_user.user_id = ?
    GROUP BY p.id, pol.nome, cat.nome, pol.partido, f.user_id, av_user.user_id
  `;

  return new Promise((resolve, reject) => {
    db.query(sql, [usuarioId, usuarioId], (err, resultados) => {
      if (err) reject(err);
      else resolve(resultados);
    });
  });
}

function buscarPropostaPorId(propostaId, usuarioId) {
  const sql = `
    SELECT
      p.id,
      p.titulo,
      p.descricao,
      p.data_criacao,
      pol.nome AS politico_nome,
      cat.nome AS politico_cargo,
      pol.partido AS politico_partido,
      COALESCE(AVG(a.nota), 0) AS media_avaliacoes,
      CASE WHEN f.user_id IS NOT NULL THEN 1 ELSE 0 END AS favoritou,
      CASE WHEN av_user.user_id IS NOT NULL THEN 1 ELSE 0 END AS avaliou
    FROM propostas p
    JOIN politicos pol ON p.politico_id = pol.id
    LEFT JOIN categorias_politicos cat ON pol.categoria_id = cat.id
    LEFT JOIN avaliacoes a ON a.proposta_id = p.id
    LEFT JOIN favoritos f ON f.proposta_id = p.id AND f.user_id = ?
    LEFT JOIN avaliacoes av_user ON av_user.proposta_id = p.id AND av_user.user_id = ?
    WHERE p.id = ?
    GROUP BY p.id, pol.nome, cat.nome, pol.partido, p.data_criacao, f.user_id, av_user.user_id
  `;

  return new Promise((resolve, reject) => {
    db.query(sql, [usuarioId, usuarioId, propostaId], (err, resultados) => {
      if (err) return reject(err);

      // Formata a data para DD/MM/AAAA
      resultados.forEach(p => {
        const data = new Date(p.data_criacao);
        const dia = String(data.getDate()).padStart(2, '0');
        const mes = String(data.getMonth() + 1).padStart(2, '0');
        const ano = data.getFullYear();
        p.data_criacao = `${dia}/${mes}/${ano}`;

        // Transformando a descrição em array de parágrafos
        p.descricao = p.descricao
            .split(/\r?\n/)
            .map(paragrafo => paragrafo.trim())
            .filter(paragrafo => paragrafo.length > 0); // Remove linhas vazias
      });

      resolve(resultados);
    });
  });
}

async function carregarPropostas(req, res, next) {
  try {
    const usuarioId = req.user ? req.user.id : null;
    const propostas = await buscarPropostas(usuarioId);

    propostas.forEach(p => {
        p.media_avaliacoes = parseFloat(Number(p.media_avaliacoes).toFixed(1));
    });

    req.propostas = propostas;
    next();
  } catch (err) {
    next(err);
  }
}


module.exports = {
    buscarPropostaPorId,
    carregarPropostas
};
