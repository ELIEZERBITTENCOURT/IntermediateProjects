const board = document.querySelectorAll('.game-board td');
let player = 'X';
let gameOver = false;

function checkWinner() {
  if (board[0].textContent === player && board[1].textContent === player && board[2].textContent === player ||
    board[3].textContent === player && board[4].textContent === player && board[5].textContent === player ||
    board[6].textContent === player && board[7].textContent === player && board[8].textContent === player ||
    board[0].textContent === player && board[3].textContent === player && board[6].textContent === player ||
    board[1].textContent === player && board[4].textContent === player && board[7].textContent === player ||
    board[2].textContent === player && board[5].textContent === player && board[8].textContent === player ||
    board[0].textContent === player && board[4].textContent === player && board[8].textContent === player ||
    board[2].textContent === player && board[4].textContent === player && board[6].textContent === player) {
    gameOver = true;
    alert(`O jogador ${player} venceu!`);
  }
}

function makeMove(e) {
  if (gameOver || e.target.textContent !== '') {
    return;
  }

  e.target.textContent = player;
  checkWinner();

  player = player === 'X' ? 'O' : 'X';
}

board.forEach(cell => cell.addEventListener('click', makeMove));

const resetButton = document.getElementById('reset-button');
resetButton.addEventListener('click', resetGame);

function resetGame() {
  board.forEach(cell => cell.textContent = '');
  player = 'X';
  gameOver = false;
}
