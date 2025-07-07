document.addEventListener('DOMContentLoaded', function() {
  const propostas = document.querySelectorAll('[name="proposta"]');
  const favoritarButton = document.querySelectorAll('[name="favoritar"]');
  const excluirComentario = document.querySelectorAll('[name="excluirComentario"]');
  const estrelasAvaliacao = document.querySelectorAll('[name="estrelaAvaliacao"]');
  const enviarAvaliacao = document.querySelector('[name="enviarAvaliacao"]');
  let avaliacao = null;

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
        const response = await fetch(`/favoritos/proposta/${id}`, {
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

  excluirComentario.forEach(botao => {
    botao.addEventListener('click', async () => {
      const id = botao.id;
      fetch(`/comentarios/excluir/${id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      botao.innerHTML = '<p>Comentário excluído</p>';
    });
  });

  estrelasAvaliacao.forEach(estrela => {
    estrela.addEventListener('click', () => {
      const valor = estrela.id;
      estrelasAvaliacao.forEach(e => {
        e.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="2rem" height="2rem" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-star-icon lucide-star text-bege"><path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z"/></svg>';
        if (e.id <= valor) {
          e.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="2rem" height="2rem" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-star-icon lucide-star text-bege fill-bege"><path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z"/></svg>';
        }
      });
      avaliacao = valor;
    });
  });

  enviarAvaliacao.addEventListener('click', () => {
    const propostaId = enviarAvaliacao.id;
    fetch(`/avaliacao/${propostaId}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ nota: avaliacao })
        });
    window.location.reload();
  })
  
});
