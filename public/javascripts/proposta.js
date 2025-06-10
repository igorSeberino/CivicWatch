document.addEventListener('DOMContentLoaded', function() {
    const proposta = document.querySelectorAll('[name="proposta"');

    function redirecionar(rota) {
        try {
            // Redireciona para a página index.ejs
            window.location.href = rota;
        } catch (error) {
            console.error('Erro:', error);
            alert(error.message || 'Ocorreu um erro. Tente novamente.');
        }
    }

    proposta.forEach(proposta => {
        proposta.addEventListener('click', () => redirecionar('/proposta'));
    });
});