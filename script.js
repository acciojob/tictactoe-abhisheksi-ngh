const submit = document.getElementById("submit");
const inputSection = document.getElementById("input-section");
const gameSection = document.getElementById("game-section");
const board = document.getElementById("board");
const message = document.getElementById("message");

let player1 = "";
let player2 = "";
let currentPlayer = "X";
let currentName = "";
let boardState = Array(9).fill("");

submit.addEventListener("click", () => {
  player1 = document.getElementById("player-1").value.trim();
  player2 = document.getElementById("player-2").value.trim();
  if (player1 && player2) {
    inputSection.classList.add("hidden");
    gameSection.classList.remove("hidden");
    currentName = player1;
    message.textContent = `${currentName}, you're up`;
  }
});

board.addEventListener("click", (e) => {
  const cell = e.target;
  if (!cell.classList.contains("cell")) return;

  const index = parseInt(cell.id.split("-")[1]);
  if (boardState[index]) return;

  boardState[index] = currentPlayer;
  cell.textContent = currentPlayer;

  const win = checkWinner();
  if (win) {
    message.textContent = `${currentName}, congratulations you won!`;
    highlightWin(win);
    board.style.pointerEvents = "none";
    return;
  }

  // Switch turns
  currentPlayer = currentPlayer === "X" ? "O" : "X";
  currentName = currentPlayer === "X" ? player1 : player2;
  message.textContent = `${currentName}, you're up`;
});

function checkWinner() {
  const winCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let combo of winCombos) {
    const [a, b, c] = combo;
    if (
      boardState[a] &&
      boardState[a] === boardState[b] &&
      boardState[a] === boardState[c]
    ) {
      return combo;
    }
  }

  return null;
}

function highlightWin(combo) {
  combo.forEach((i) => {
    document.getElementById(`cell-${i}`).classList.add("winner");
  });
}
