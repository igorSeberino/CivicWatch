document.addEventListener('DOMContentLoaded', function() {
    const botaoDashboard = document.getElementById('dashboard');
    const botaoCadastro = document.getElementById('cadastro');
    const botaoModeracao = document.getElementById('moderacao');
    const excluirPerfil = document.querySelectorAll('[name="excluirPerfil"]');

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
    excluirPerfil.forEach(botao => {
        botao.addEventListener('click', (e) => {
            fetch(`/admin/excluirperfil/${botao.id}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
            });
            botao.disabled = true;
            botao.innerHTML = '<p>Perfil excluído</p>'
        });
    });
});