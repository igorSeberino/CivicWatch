document.addEventListener('DOMContentLoaded', function() {
    const botaoLogout = document.getElementById('logout');

    botaoLogout.onclick = () => fetch('/users/logout', {
      method: 'POST',
      credentials: 'include'
    })
    .then(res => res.json())
    .then(data => {
    window.location.href = '/'; // redireciona para home
    })
    .catch(err => console.error('Erro ao deslogar:', err));
});