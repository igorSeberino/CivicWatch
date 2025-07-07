document.addEventListener('DOMContentLoaded', function() {
    const title = document.getElementById('form-title');
    const partidoField = document.getElementById('partido');
    const estadoField = document.getElementById('estado');
    const municipioField = document.getElementById('municipio');
    const politicoButton = document.getElementById('politico');
    const categoriaButton = document.getElementById('categoria');
    const button = document.getElementById('submitButton');
    const form = document.getElementById('auth-form');

    categoriaButton.addEventListener('click', function(event) {
        event.preventDefault();
        form.setAttribute('action', '/cadastro/politico');
        politicoButton.classList.remove('bg-verde-claro');
        categoriaButton.classList.add('bg-verde-claro');
        form.setAttribute('method', 'POST');
        title.innerText = "Crie uma nova categoria de político";
        partidoField.style.display = "none";
        partidoField.removeAttribute('required');
        estadoField.style.display = "none";
        estadoField.removeAttribute('required');
        municipioField.style.display = "none";
        municipioField.removeAttribute('required');
        button.innerText = "Criar Categoria";
    })

    politicoButton.addEventListener('click', function(event) {
        event.preventDefault();
        form.setAttribute('action', '/cadastro/categoria');
        categoriaButton.classList.remove('bg-verde-claro');
        politicoButton.classList.add('bg-verde-claro');
        form.setAttribute('method', 'POST');
        title.innerText = "Crie um novo perfil político";
        partidoField.style.display = "block";
        partidoField.setAttribute('required', '');
        estadoField.style.display = "block";
        estadoField.setAttribute('required', '');
        municipioField.style.display = "block";
        municipioField.setAttribute('required', '');
        button.innerText = "Criar Político";
    })
});
