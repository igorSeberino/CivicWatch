document.addEventListener('DOMContentLoaded', function() {
    const botaoPaginaInicial = document.getElementById('pagina-inicial');
    const botaoFavoritos = document.getElementById('favoritos');
    const botaoPerfil = document.getElementById('perfil');
    const botaoExplorar = document.getElementById('pesquisar');

    function redirecionar(rota) {
        try {
            // Redireciona para a página index.ejs
            window.location.href = rota;
        } catch (error) {
            console.error('Erro:', error);
            alert(error.message || 'Ocorreu um erro. Tente novamente.');
        }
    }

    botaoPaginaInicial.onclick = () => redirecionar('/home');
    botaoFavoritos.onclick = () => redirecionar('/favoritos');
    botaoPerfil.onclick = () => redirecionar('/perfil');
    botaoExplorar.onclick = () => redirecionar('/explorar');
});