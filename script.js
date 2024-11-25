const boardElement = document.querySelector('.board');
const messageElement = document.querySelector('.message');
const newGameButton = document.getElementById('newGame');
const twoPlayersButton = document.getElementById('twoPlayers');
const playWithAIButton = document.getElementById('playWithAI');

let board = Array(9).fill(null);
let currentPlayer = 'X';
let isGameActive = true;
let againstAI = false;

function createBoard() {
  boardElement.innerHTML = '';
  board.forEach((cell, index) => {
    const cellElement = document.createElement('div');
    cellElement.classList.add('cell');
    if (cell) {
      cellElement.textContent = cell;
      cellElement.classList.add('taken');
    }
    cellElement.addEventListener('click', () => handleCellClick(index));
    boardElement.appendChild(cellElement);
  });
}

function handleCellClick(index) {
  if (!isGameActive || board[index]) return;

  board[index] = currentPlayer;
  if (checkWinner()) {
    messageElement.textContent = `${currentPlayer} játékos nyert.`;
    isGameActive = false;
  } else if (board.every(cell => cell)) {
    messageElement.textContent = 'A játék döntetlen.';
    isGameActive = false;
  } else {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    if (againstAI && currentPlayer === 'O') {
      aiMove();
    }
  }
  createBoard();
}

function checkWinner() {
  const winPatterns = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], 
    [0, 3, 6], [1, 4, 7], [2, 5, 8], 
    [0, 4, 8], [2, 4, 6],           
  ];
  return winPatterns.some(pattern =>
    pattern.every(index => board[index] === currentPlayer)
  );
}

function aiMove() {
  const availableCells = board
    .map((cell, index) => (cell === null ? index : null))
    .filter(index => index !== null);
  const randomIndex = availableCells[Math.floor(Math.random() * availableCells.length)];
  board[randomIndex] = 'O';
  if (checkWinner()) {
    messageElement.textContent = 'Számítógép nyert.';
    isGameActive = false;
  } else if (board.every(cell => cell)) {
    messageElement.textContent = 'A játék döntetlen.';
    isGameActive = false;
  } else {
    currentPlayer = 'X';
  }
}

function resetGame() {
  board = Array(9).fill(null);
  currentPlayer = 'X';
  isGameActive = true;
  messageElement.textContent = '';
  createBoard();
}

twoPlayersButton.addEventListener('click', () => {
  againstAI = false;
  resetGame();
});

playWithAIButton.addEventListener('click', () => {
  againstAI = true;
  resetGame();
});

newGameButton.addEventListener('click', resetGame);


createBoard();
