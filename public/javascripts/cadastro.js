document.addEventListener('DOMContentLoaded', function() {
    const title = document.getElementById('form-title');
    const partidoField = document.getElementById('partido');
    const estadoField = document.getElementById('estado');
    const municipioField = document.getElementById('municipio');
    const categoriaField = document.querySelector('[name="categoria"]');
    const politicoButton = document.getElementById('politico');
    const categoriaButton = document.getElementById('categoria');
    const categorias = document.querySelectorAll('[name="categoriaButton"]');
    const categoriaTitulo = document.getElementById('categoriaTitulo');
    const button = document.getElementById('submitButton');
    const form = document.getElementById('auth-form');

    categoriaButton.addEventListener('click', function(event) {
        event.preventDefault();
        form.setAttribute('action', '/cadastro/categoria');
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
        categoriaField.removeAttribute('required');
        categoriaField.value = null;
        categorias.forEach(c => {
            c.style.display = "none";
            c.removeAttribute('required');
        });
        categoriaTitulo.style.display = "none";
        categoriaTitulo.removeAttribute('required');
        button.innerText = "Criar Categoria";
    })

    politicoButton.addEventListener('click', function(event) {
        event.preventDefault();
        form.setAttribute('action', '/cadastro/politico');
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
        categoriaField.setAttribute('required', '');
        categorias.forEach(c => {
            c.style.display = "block";
            c.setAttribute('required', '');
        });
        categoriaTitulo.style.display = "block";
        categoriaTitulo.setAttribute('required');
        button.innerText = "Criar Político";
    })

    categorias.forEach(c => {
        c.addEventListener('click', function(e) {
            e.preventDefault();
            categorias.forEach(cat => {
                cat.classList.remove('bg-verde-claro');
            })
            c.classList.add('bg-verde-claro');
            categoriaField.value = c.id;
        })
    })
});
