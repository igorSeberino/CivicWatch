document.addEventListener('DOMContentLoaded', function() {
  const propostas = document.querySelectorAll('[name="proposta"]');

  propostas.forEach(proposta => {
    proposta.addEventListener('click', () => {
      const id = proposta.dataset.id;
      window.location.href = `/proposta/${id}`;
    });
  });
  
});
