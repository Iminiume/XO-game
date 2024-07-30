const board = document.getElementById("board") as HTMLDivElement;
const resetBtn = document.getElementById("reset-btn") as HTMLDivElement;

type Board = (string | null)[][];

const boardState: Board = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

const cellCount: number = 9;
const cells: HTMLElement[] = [];

type PlayerCharType = "X" | "O";

const userChar: PlayerCharType = "X";
const computerChar: PlayerCharType = "O";

let playerChar: PlayerCharType = userChar;

for (let cell = 0; cell < cellCount; cell++) {
  const cellEl: HTMLElement = document.createElement("div");
  cellEl.classList.add("cell", "flex-center");
  cellEl.dataset.index = cell.toString();
  cellEl.onclick = (e) => handleMove(e);

  board.appendChild(cellEl);
  cells.push(cellEl);
}

const handleMove = (e: Event) => {
  const selectedEl = e.target as HTMLElement;
  if (!selectedEl.textContent) {
    selectedEl.textContent = playerChar;
    makeMove(selectedEl);

    if (checkState()) return;
    else {
      playerChar = playerChar === userChar ? computerChar : userChar;
      playerChar === computerChar && aiMove();
    }
  }
};

function makeMove(el: HTMLElement) {
  const index = parseInt(el.dataset.index!);
  el.textContent = playerChar;
  const row = Math.floor(index / 3);
  const col = index % 3;
  boardState[row][col] = playerChar;
}

function aiMove() {
  const emptyCells: HTMLElement[] = cells.filter((cell) => !cell.textContent);
  if (emptyCells.length > 0) {
    const randomCell: HTMLElement =
      emptyCells[Math.floor(Math.random() * emptyCells.length)];
    makeMove(randomCell);

    if (checkState()) return;
    else playerChar = userChar;
  }
}

function checkRow(board: Board, row: number): boolean {
  return (
    board[row][0] !== null &&
    board[row][0] === board[row][1] &&
    board[row][1] === board[row][2]
  );
}

function checkColumn(board: Board, col: number): boolean {
  return (
    board[0][col] !== null &&
    board[0][col] === board[1][col] &&
    board[1][col] === board[2][col]
  );
}

function checkDiagonals(board: Board): boolean {
  const center = board[1][1];
  if (center === null) return false;
  return (
    (center === board[0][0] && center === board[2][2]) ||
    (center === board[0][2] && center === board[2][0])
  );
}

function checkWin(board: Board): boolean {
  for (let i = 0; i < 3; i++) {
    if (checkRow(board, i)) return true;
  }

  for (let i = 0; i < 3; i++) {
    if (checkColumn(board, i)) return true;
  }

  if (checkDiagonals(board)) return true;

  return false;
}

function checkState(): boolean {
  if (checkWin(boardState)) {
    alert(`${playerChar} wins!`);
    reset();
    return true;
  } else if (isDraw(boardState)) {
    alert("DRAW!");
    reset();
    return true;
  } else return false;
}

function isDraw(board: Board): boolean {
  for (let row of board) {
    for (let cell of row) {
      if (cell === null) return false;
    }
  }
  return true;
}

const reset = () => {
  for (let cell of cells) {
    cell.textContent = "";
  }
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      boardState[i][j] = null;
    }
  }
  playerChar = userChar;
};

resetBtn.onclick = () => reset();
