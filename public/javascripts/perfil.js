document.addEventListener('DOMContentLoaded', function() {
    const botaoLogout = document.getElementById('logout');

    function redirecionar(rota) {
        try {
            // Redireciona para a página index.ejs
            window.location.href = rota;
        } catch (error) {
            console.error('Erro:', error);
            alert(error.message || 'Ocorreu um erro. Tente novamente.');
        }
    }

    botaoLogout.onclick = () => fetch('/users/logout', {
      method: 'POST',
      credentials: 'include'
    })
    .then(res => res.json())
    .then(data => {
      console.log(data.message);
    window.location.href = '/'; // redireciona para home
    })
    .catch(err => console.error('Erro ao deslogar:', err));
});