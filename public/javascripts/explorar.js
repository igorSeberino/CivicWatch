document.addEventListener('DOMContentLoaded', function() {
    const botaoDeputado = document.getElementById('deputado');
    const botaoSenador = document.getElementById('senador');
    const botaoPrefeito = document.getElementById('prefeito');
    const buttons = document.querySelectorAll('[name="botao-cargo"]');

    function redirecionar(rota) {
        try {
            // Redireciona para a página index.ejs
            window.location.href = rota;
        } catch (error) {
            console.error('Erro:', error);
            alert(error.message || 'Ocorreu um erro. Tente novamente.');
        }
    }

    botaoDeputado.onclick = () => redirecionar('/explorar/Deputado Federal');
    botaoSenador.onclick = () => redirecionar('/explorar/Senador');
    botaoPrefeito.onclick = () => redirecionar('/explorar/Prefeito');
});