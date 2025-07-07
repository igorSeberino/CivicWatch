const db = require('../config/database');

const buscarPerfilPorId = async (usuarioId) => {
    const sql=`
    SELECT name, email, data_criacao FROM users WHERE id = ?
    `;

    return new Promise((resolve, reject) => {
    db.query(sql, [usuarioId], (err, resultados) => {
      if (err) return reject(err);

      const usuario = resultados[0];

      // Formatar data
      const data = new Date(usuario.data_criacao);
      const dia = String(data.getDate()).padStart(2, '0');
      const mes = String(data.getMonth() + 1).padStart(2, '0');
      const ano = data.getFullYear();
      usuario.data_criacao = `${dia}/${mes}/${ano}`;

      resolve(usuario);
    });
  });
};

const buscarTodosOsPerfis = async () => {
    const sql=`
    SELECT * FROM users;
    `;

    return new Promise((resolve, reject) => {
    db.query(sql, (err, resultados) => {
      if (err) return reject(err);
      resolve(resultados);
    });
  });
};

module.exports = {
    buscarPerfilPorId,
    buscarTodosOsPerfis
};
