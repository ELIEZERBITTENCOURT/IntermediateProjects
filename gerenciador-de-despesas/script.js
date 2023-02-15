const form = document.querySelector('form');
const descricaoInput = document.getElementById('descricao');
const valorInput = document.getElementById('valor');
const categoriaInput = document.getElementById('categoria');
const categoriasList = document.getElementById('categorias');
const graficoCanvas = document.getElementById('grafico');
const relatorioList = document.getElementById('relatorio');

let despesas = [];

form.addEventListener('submit', (event) => {
    event.preventDefault();

    const descricao = descricaoInput.value;
    const valor = Number(valorInput.value);
    const categoria = categoriaInput.value;

    if (descricao && valor && categoria) {
        const despesa = { descricao, valor, categoria };
        despesas.push(despesa);
        atualizarCategorias();
        atualizarGrafico();
        atualizarRelatorio();
        descricaoInput.value = '';
        valorInput.value = '';
        categoriaInput.value = 'alimentacao';
    }
});

function atualizarCategorias() {
    categoriasList.innerHTML = '';
    const categorias = new Set(despesas.map((d) => d.categoria));
    categorias.forEach((c) => {
        const li = document.createElement('li');
        li.textContent = c;
        categoriasList.appendChild(li);
    });
}

function atualizarGrafico() {
    const valoresPorCategoria = {};
    despesas.forEach((d) => {
        if (!valoresPorCategoria[d.categoria]) {
            valoresPorCategoria[d.categoria] = 0;
        }
        valoresPorCategoria[d.categoria] += d.valor;
    });

    const categorias = Object.keys(valoresPorCategoria);
    const valores = categorias.map((c) => valoresPorCategoria[c]);

    new Chart(graficoCanvas, {
        type: 'doughnut',
        data: {
            labels: categorias,
            datasets: [
                {
                    data: valores,
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.5)',
                        'rgba(54, 162, 235, 0.5)',
                        'rgba(255, 206, 86, 0.5)',
                        'rgba(75, 192, 192, 0.5)',
                        'rgba(153, 102, 255, 0.5)',
                    ],
                    borderColor: [
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75,192, 1)',
                        'rgba(153, 102, 255, 1)',
                    ],
                    borderWidth: 1,
                },
            ],
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
        },
    });
}

function atualizarRelatorio() {
    relatorioList.innerHTML = '';
    despesas.forEach((d) => {
        const li = document.createElement('li');
        li.textContent = '${ d.descricao } - ${ d.valor } - ${ d.categoria }';
        relatorioList.appendChild(li);
    });
}

atualizarCategorias();
atualizarGrafico();
atualizarRelatorio(); 
