document.addEventListener('DOMContentLoaded', function() {
  const propostas = document.querySelectorAll('[name="proposta"]');

  function redirecionar(id) {
    fetch(`/proposta/${id}`, {
      method: 'GET',
      credentials: 'include' // envia cookies automaticamente
    })
    .then(response => {
      if (response.status === 401) {
        throw new Error('Não autorizado. Faça login novamente.');
      } else if (response.status === 404) {
        throw new Error('Proposta não encontrada.');
      } else if (!response.ok) {
        throw new Error('Erro ao buscar proposta.');
      }
      return response.json();
    })
    .then(data => {
      console.log('Proposta:', data);
      // redireciona para rota da proposta que renderiza proposta.ejs
      window.location.href = `/proposta/${id}`;
    })
    .catch(error => {
      alert(error.message);
    });
  }

  propostas.forEach(proposta => {
    proposta.addEventListener('click', () => {
      const id = proposta.dataset.id;
      redirecionar(id);
    });
  });
});
