document.addEventListener('DOMContentLoaded', function() {
    const toggleLink = document.getElementById('toggle-link');
    const title = document.getElementById('form-title');
    const nameField = document.getElementById('name');
    const button = document.querySelector('button');
    const toggleText = document.getElementById('toggle-text');
    const form = document.getElementById('auth-form');
    let isLogin = false;

    function updateForm() {
        if (isLogin) {
            title.innerText = "Faça login em sua conta";
            nameField.style.display = "none";
            nameField.removeAttribute('required');
            button.innerText = "Entrar";
            toggleText.innerHTML = "Não tem uma conta? <a href='#' id='toggle-link'>Cadastre-se</a>";
        } else {
            title.innerText = "Crie uma conta";
            nameField.style.display = "block";
            nameField.setAttribute('required', '');
            button.innerText = "Criar Conta";
            toggleText.innerHTML = "Já tem uma conta? <a href='#' id='toggle-link'>Login</a>";
        }
    }

    toggleText.addEventListener('click', function(event) {
        if (event.target.id === 'toggle-link') {
            event.preventDefault();
            isLogin = !isLogin;
            updateForm();
        }
    });

    form.addEventListener('submit', async function(event) {
        event.preventDefault();
        
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const name = document.getElementById('name').value;

        try {
            const endpoint = isLogin ? '/users/login' : '/users/register';
            const data = isLogin ? { email, password } : { name, email, password };

            const response = await fetch(endpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });

            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.message || 'Algo deu errado');
            }

            // Armazena os dados do usuário no localStorage
            localStorage.setItem('user', JSON.stringify(result.user));

            // Redireciona para a página index.ejs
            window.location.href = '/home';
        } catch (error) {
            console.error('Erro:', error);
            alert(error.message || 'Ocorreu um erro. Tente novamente.');
        }
    });
});
