const quiz = [
    {
        question: "Qual é a capital do Brasil?",
        options: ["São Paulo", "Rio de Janeiro", "Brasília", "Salvador"],
        answer: "Brasília"
    },
    {
        question: "Quem escreveu Dom Quixote?",
        options: ["Miguel de Cervantes", "William Shakespeare", "Johann Wolfgang von Goethe", "Friedrich Nietzsche"],
        answer: "Miguel de Cervantes"
    },
    {
        question: "Quem pintou a Mona Lisa?",
        options: ["Leonardo da Vinci", "Pablo Picasso", "Vincent van Gogh", "Rembrandt"],
        answer: "Leonardo da Vinci"
    },
    {
        question: "Qual é o maior planeta do Sistema Solar?",
        options: ["Terra", "Júpiter", "Saturno", "Vênus"],
        answer: "Saturno"
    }
];

const quizContainer = document.getElementById("quiz");
const questionElement = document.querySelector(".question");
const optionsElement = document.querySelector(".options");
const feedbackElement = document.querySelector(".feedback");
const nextButton = document.getElementById("next");

let currentQuestion = 0;
let score = 0;
let randomizedQuestions = quiz.sort(() => Math.random() - 0.5);

function showQuestion() {
    const question = randomizedQuestions[currentQuestion];
    questionElement.innerText = question.question;
    optionsElement.innerHTML = "";
    for (let i = 0; i < question.options.length; i++) {
        const option = document.createElement("div");
        option.classList.add("option");
        option.innerText = question.options[i];
        option.addEventListener("click", selectAnswer);
        optionsElement.appendChild(option);
    }
    showNextButton();
}

function selectAnswer(event) {
    const selectedOption = event.target;
    const answer = randomizedQuestions[currentQuestion].answer;
    if (selectedOption.innerText === answer) {
        selectedOption.style.backgroundColor = "green";
        feedbackElement.innerText = "Correto!";
        score++;
    } else {
        selectedOption.style.backgroundColor = "red";
        feedbackElement.innerText = `Errado. A resposta correta é ${answer}.`;
    }
    disableOptions();
    showNextButton();
}

function disableOptions() {
    const options = document.querySelectorAll(".option");
    for (let i = 0; i < options.length; i++) {
        options[i].classList.add("disabled");
    }
}

function enableOptions() {
    const options = document.querySelectorAll(".option");
    for (let i = 0; i < options.length; i++) {
        options[i].classList.remove("disabled");
        options[i].style.backgroundColor = "#eee";
    }
}

function showNextButton() {
    nextButton.style.display = "block";
}

function hideNextButton() {
    nextButton.style.display = "none";
}

function showFeedback() {
    feedbackElement.style.display = "block";
}

function hideFeedback() {
    feedbackElement.style.display = "none";
}

function showResults() {
    quizContainer.innerHTML = "";
    const results = document.createElement("div");
    results.innerHTML = `<h2>Resultados</h2><p>Você acertou ${score} de ${randomizedQuestions.length} perguntas.</p>`;
    quizContainer.appendChild(results);
}

function nextQuestion() {
    hideNextButton();
    hideFeedback();
    enableOptions();
    currentQuestion++;
    if (currentQuestion === randomizedQuestions.length) {
        showResults();
    } else {
        showQuestion();
    }
}

nextButton.addEventListener("click", nextQuestion);

showQuestion();
