const containerEl = document.querySelectorAll('.container');

const playBtnEl = document.querySelector('.playBtn')

const insectBtnEls = document.querySelectorAll('.insectBtn');

const gameContainerEl = document.querySelector('.gameContainer')
const timeEl = document.querySelector('.time')
const scoreEl = document.querySelector('.score')
const messageEl = document.querySelector('.message')

let seconds = 0;
let score = 0;
let selectedInsect = {};

// Quando você clicar no botão play, ele irá subir (desaparecer) e agora o contêiner insectList será exibido na tela.
playBtnEl.addEventListener('click', () => {
    containerEl[0].classList.add('up');
})

// Quando clicar em qualquer um dos insetos, ele anotará a fonte e a alternativa (alt) da imagem e chamará a função de início do jogo e também a função createInsect com um atraso de 1000ms.
insectBtnEls.forEach(btn => {
    btn.addEventListener('click', () => {
        const img = btn.querySelector('img');
        const src = img.getAttribute('src');
        const alt = img.getAttribute('alt');
        selectedInsect = { src, alt };
        containerEl[1].classList.add('up');
        setTimeout(createInsect, 1000);
        startGame();
    })
})

// a função de início do jogo chamará a função de aumento de tempo a cada 1000ms.
function startGame() {
    setInterval(increaseTime, 1000);
}

// Atualiza a hora.
function increaseTime() {
    let min = Math.floor(seconds / 60);
    let sec = seconds % 60;
    m = min < 10 ? `0${min}` : min;
    s = sec < 10 ? `0${sec}` : sec;
    timeEl.innerHTML = `Time: ${m}:${s}`
    seconds++;
}

// Esta função gera insetos em locais aleatórios usando a função getRandomLocation.
function createInsect() {
    const insect = document.createElement('div');
    insect.classList.add('insect');
    const { x, y } = getRandomLocation();
    insect.style.top = `${y}px`;
    insect.style.left = `${x}px`;
    insect.innerHTML = `<img src="${selectedInsect.src}" alt="${selectedInsect.alt}" style="transform: rotate(${Math.random() * 360}deg)" />`;
    gameContainerEl.appendChild(insect)

// Quando clicarmos em qualquer um dos insetos, ele chamará a função catchInsect.
    insect.addEventListener('click', catchInsect)

}

// Dá localização aleatória
function getRandomLocation() {
    const width = window.innerWidth
    const height = window.innerHeight
    const x = Math.random() * (width - 200) + 100
    const y = Math.random() * (height - 200) + 100
    return { x, y }
}

// quando pegamos o inseto ele chama a função gainScore e adiciona a classe catch para remover esse inseto e também chama a função addInsects.
function catchInsect() {
    increaseScore();
    this.classList.add('caught')
    addInsects()
}

// Chamará a função createInsect 2 vezes com atraso de 1000ms e 1500ms.
function addInsects() {
    setTimeout(createInsect, 1000)
    setTimeout(createInsect, 1500)
}

// Atualiza a pontuação e exibirá uma mensagem após atingir pontuação maior que 20.
function increaseScore() {
    score++;
    if(score > 20) {
        messageEl.classList.add('visible');
    }
    scoreEl.innerHTML = `Score: ${score}`;
}