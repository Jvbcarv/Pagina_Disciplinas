const checkboxes = document.querySelectorAll('#disciplinas input[type="checkbox"]');
const totalHoras = document.getElementById('total');
const listaDisciplinas = document.getElementById('lista');

function atualizarResultado() {
    let soma = 0;
    listaDisciplinas.innerHTML = ''; 

    
    const modulosSelecionados = {};

    checkboxes.forEach(cb => {
        if (cb.checked) {
            const horas = parseInt(cb.dataset.horas);
            const nome = cb.dataset.nome;

            
            let tr = cb.closest('tr');
            let modulo = '';
            while (tr = tr.previousElementSibling) {
                if (tr.classList.contains('modulo')) {
                    modulo = tr.children[0].textContent.trim();
                    break;
                }
            }

            soma += horas;

            if (!modulosSelecionados[modulo]) {
                modulosSelecionados[modulo] = [];
            }
            modulosSelecionados[modulo].push({nome, horas});
        }
    });

    totalHoras.textContent = soma;

    
    for (const modulo in modulosSelecionados) {
        const liModulo = document.createElement('li');
        liModulo.innerHTML = `<strong>${modulo}</strong>`;
        const ulDisciplinas = document.createElement('ul');

        modulosSelecionados[modulo].forEach(d => {
            const li = document.createElement('li');
            li.textContent = `${d.nome} - ${d.horas}h`;
            ulDisciplinas.appendChild(li);
        });

        liModulo.appendChild(ulDisciplinas);
        listaDisciplinas.appendChild(liModulo);
    }
}

checkboxes.forEach(cb => {
    cb.addEventListener('change', atualizarResultado);
});
