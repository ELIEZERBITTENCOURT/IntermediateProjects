const images = [
    "imagens/imagem1.jpg",
    "imagens/imagem2.jpg",
    "imagens/imagem3.jpg",
    "imagens/imagem4.jpg"
];

const image = document.getElementById("image");
let index = 0;

function nextImage() {
    index++;
    if (index >= images.length) {
        index = 0;
    }
    image.src = images[index];
}

function prevImage() {
    index--;
    if (index < 0) {
        index = images.length - 1;
    }
    image.src = images[index];
}

document.getElementById("next-button").addEventListener("click", nextImage);
document.getElementById("prev-button").addEventListener("click", prevImage);

let scale = 1;
let rotation = 0;

function zoomIn() {
    scale += 0.1;
    updateImage();
}

function zoomOut() {
    scale -= 0.1;
    updateImage();
}

function rotateLeft() {
    rotation -= 90;
    updateImage();
}

function rotateRight() {
    rotation += 90;
    updateImage();
}

function updateImage() {
    image.style.transform = `scale(${scale}) rotate(${rotation}deg)`;
}

document.addEventListener("keydown", (event) => {
    switch (event.key) {
        case "+":
            zoomIn();
            break;
        case "-":
            zoomOut();
            break;
        case "ArrowLeft":
            rotateLeft();
            break;
        case "ArrowRight":
            rotateRight();
            break;
        default:
            break;
    }
});
