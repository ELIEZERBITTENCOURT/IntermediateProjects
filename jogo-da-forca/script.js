const words = [
    "amor",
    "carro",
    "casa",
    "computador",
    "futebol",
    "guitarra",
    "livro",
    "música",
    "praia",
    "viagem"
  ];
  
  let selectedWord = words[Math.floor(Math.random() * words.length)];
  let guessesRemaining = 6; // número de tentativas restantes
  let guessedLetters = []; // letras já adivinhadas
  let wordDisplay = []; // array para exibir a palavra com traços e letras adivinhadas

  function displayWord() {
    let word = "";
    for (let i = 0; i < selectedWord.length; i++) {
      if (guessedLetters.includes(selectedWord[i])) {
        word += selectedWord[i];
      } else {
        word += "_";
      }
    }
    wordDisplay = word.split("");
    document.querySelector(".word-display").innerText = word;
  }

  function checkLetter(letter) {
    if (selectedWord.includes(letter)) {
      guessedLetters.push(letter);
      displayWord();
      if (!wordDisplay.includes("_")) {
        document.querySelector(".word-display").innerText = `Parabéns! Você acertou a palavra "${selectedWord}".`;
      }
    } else {
      guessesRemaining--;
      document.querySelector(".guesses-remaining").innerText = `Tentativas restantes: ${guessesRemaining}`;
      if (guessesRemaining === 0) {
        document.querySelector(".word-display").innerText = `Você perdeu! A palavra era "${selectedWord}".`;
      }
    }
  }
  

  document.querySelector("button").addEventListener("click", function() {
    let guess = document.querySelector("input").value.toLowerCase();
    document.querySelector("input").value = "";
    if (guessedLetters.includes(guess)) {
      alert("Você já adivinhou essa letra. Tente outra.");
    } else {
      checkLetter(guess);
    }
  });

  displayWord();

      