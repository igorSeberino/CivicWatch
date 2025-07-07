document.addEventListener('DOMContentLoaded', function() {
    const toggleLink = document.getElementById('toggle-link');
    const title = document.getElementById('form-title');
    const nameField = document.getElementById('name');
    const button = document.querySelector('button');
    const toggleText = document.getElementById('toggle-text');
    const form = document.getElementById('auth-form');
    const docTitle = document.getElementById('titulo');
    let isLogin = false;

    function updateForm() {
        if (isLogin) {
            docTitle.innerText = "Login";
            form.setAttribute('action', '/users/login');
            form.setAttribute('method', 'POST');
            title.innerText = "Faça login em sua conta";
            nameField.style.display = "none";
            nameField.removeAttribute('required');
            button.innerText = "Entrar";
            toggleText.innerHTML = "Não tem uma conta? <a href='#' id='toggle-link'>Cadastre-se</a>";
        } else {
            docTitle.innerText = "Cadastro";
            form.setAttribute('action', '/users/register');
            form.setAttribute('method', 'POST');
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

    updateForm();
});
