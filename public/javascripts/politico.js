document.addEventListener('DOMContentLoaded', function() {
    const politicos = document.querySelectorAll('[name=politico]');

    politicos.forEach(politico => {
        politico.addEventListener('click', (e) => {
            const id = politico.dataset.id;
            window.location.href = `politico/${id}`;
        });
    });
});