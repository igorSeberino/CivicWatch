document.addEventListener('DOMContentLoaded', function() {
    const botaoDashboard = document.getElementById('dashboard');
    const botaoCadastro = document.getElementById('cadastro');
    const botaoModeracao = document.getElementById('moderacao');

    function redirecionar(rota) {
        try {
            // Redireciona para a página index.ejs
            window.location.href = rota;
        } catch (error) {
            console.error('Erro:', error);
            alert(error.message || 'Ocorreu um erro. Tente novamente.');
        }
    }

    botaoDashboard.onclick = () => redirecionar('/admin/dashboard');
    botaoCadastro.onclick = () => redirecionar('/admin/cadastro');
    botaoModeracao.onclick = () => redirecionar('/admin/moderacao');
});