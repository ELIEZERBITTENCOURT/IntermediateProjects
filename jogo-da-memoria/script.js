const tabuleiro = document.querySelector('.tabuleiro');

const cartas = [
    '🐶', '🐶',
    '🐱', '🐱',
    '🐭', '🐭',
    '🐹', '🐹',
    '🐰', '🐰',
    '🐻', '🐻',
    '🦊', '🦊',
    '🐨', '🐨',
    '🐼', '🐼',
    '🐷', '🐷',
    '🦁', '🦁',
    '🐮', '🐮',
    '🐸', '🐸',
    '🐵', '🐵',
    '🦉', '🦉'
];

// Embaralha as cartas aleatoriamente
function embaralharCartas(cartas) {
    for (let i = cartas.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [cartas[i], cartas[j]] = [cartas[j], cartas[i]];
    }
    return cartas;
}

// Adiciona as cartas ao tabuleiro
function adicionarCartasAoTabuleiro(cartas) {
    cartas.forEach((carta, index) => {
        const divCarta = document.createElement('div');
        divCarta.classList.add('carta');
        divCarta.dataset.valor = carta;
        divCarta.dataset.id = index;

        const spanConteudo = document.createElement('span');
        spanConteudo.classList.add('conteudo-carta');
        spanConteudo.textContent = carta;

        divCarta.appendChild(spanConteudo);
        tabuleiro.appendChild(divCarta);
        divCarta.addEventListener('click', virarCarta);
    });
}

let cartaVirada = false;
let cartaAnterior = null;
let paresEncontrados = 0;

// Vira a carta quando o jogador clica nela
function virarCarta() {
    if (this === cartaAnterior) return; // Impede que a mesma carta seja clicada duas vezes
    this.classList.add('virada');
    if (!cartaVirada) {
        cartaVirada = true;
        cartaAnterior = this;
    } else {
        if (this.dataset.valor === cartaAnterior.dataset.valor) {
            this.classList.add('acertou');
            cartaAnterior.classList.add('acertou');
            paresEncontrados++;
            if (paresEncontrados === cartas.length / 2) {
                setTimeout(() => alert('Parabéns, você venceu o jogo!'), 500);
            }
        } else {
            this.classList.add('erro');
            cartaAnterior.classList.add('erro');
            setTimeout(() => {
                this.classList.remove('virada', 'erro');
                cartaAnterior.classList.remove('virada', 'erro');
            }, 1000);
        }
        cartaVirada = false;
        cartaAnterior = null;
    }
}

// Inicia o jogo
function iniciarJogo() {
    const cartasEmbaralhadas = embaralharCartas(cartas);
    adicionarCartasAoTabuleiro(cartasEmbaralhadas);
}

iniciarJogo();
