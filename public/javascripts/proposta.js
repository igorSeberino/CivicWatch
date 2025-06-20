document.addEventListener('DOMContentLoaded', function() {
  const propostas = document.querySelectorAll('[name="proposta"]');
  const favoritarButton = document.querySelectorAll('[name="favoritar"]');

  propostas.forEach(proposta => {
    proposta.addEventListener('click', (e) => {
      if (e.target.closest("button")) return;
      const id = proposta.dataset.id;
      window.location.href = `/proposta/${id}`;
    });
  });

  favoritarButton.forEach(favoritar => {
    favoritar.addEventListener('click', async (event) => {
      const id = favoritar.dataset.id;

      try {
        const response = await fetch(`/favoritos/${id}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ propostaId: id }) // se o back-end usar esse parâmetro
        });

        const data = await response.json();

        if(response.ok) {
          // Aqui você pode atualizar o botão visualmente, por exemplo
          if(data.favoritado) {
            favoritar.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="3rem" height="3rem" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-heart-icon lucide-heart text-red-700 fill-red-700"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>`;
          } else {
            favoritar.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="3rem" height="3rem" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-heart-icon lucide-heart text-bege"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>`;
          }
        } else {
          alert('Erro ao favoritar: ' + data.erro);
        }
      } catch (err) {
        alert('Erro na requisição: ' + err.message);
      }
    });
  });
  
});
