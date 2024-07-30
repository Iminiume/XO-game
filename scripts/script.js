var board = document.getElementById("board");
var resetBtn = document.getElementById("reset-btn");
var boardState = [
    [null, null, null],
    [null, null, null],
    [null, null, null],
];
var cellCount = 9;
var cells = [];
var userChar = "X";
var computerChar = "O";
var playerChar = userChar;
for (var cell = 0; cell < cellCount; cell++) {
    var cellEl = document.createElement("div");
    cellEl.classList.add("cell", "flex-center");
    cellEl.dataset.index = cell.toString();
    cellEl.onclick = function (e) { return handleMove(e); };
    board.appendChild(cellEl);
    cells.push(cellEl);
}
var handleMove = function (e) {
    var selectedEl = e.target;
    if (!selectedEl.textContent) {
        selectedEl.textContent = playerChar;
        makeMove(selectedEl);
        if (checkState())
            return;
        else {
            playerChar = playerChar === userChar ? computerChar : userChar;
            playerChar === computerChar && aiMove();
        }
    }
};
function makeMove(el) {
    var index = parseInt(el.dataset.index);
    el.textContent = playerChar;
    var row = Math.floor(index / 3);
    var col = index % 3;
    boardState[row][col] = playerChar;
}
function aiMove() {
    var emptyCells = cells.filter(function (cell) { return !cell.textContent; });
    if (emptyCells.length > 0) {
        var randomCell = emptyCells[Math.floor(Math.random() * emptyCells.length)];
        makeMove(randomCell);
        if (checkState())
            return;
        else
            playerChar = userChar;
    }
}
function checkRow(board, row) {
    return (board[row][0] !== null &&
        board[row][0] === board[row][1] &&
        board[row][1] === board[row][2]);
}
function checkColumn(board, col) {
    return (board[0][col] !== null &&
        board[0][col] === board[1][col] &&
        board[1][col] === board[2][col]);
}
function checkDiagonals(board) {
    var center = board[1][1];
    if (center === null)
        return false;
    return ((center === board[0][0] && center === board[2][2]) ||
        (center === board[0][2] && center === board[2][0]));
}
function checkWin(board) {
    for (var i = 0; i < 3; i++) {
        if (checkRow(board, i))
            return true;
    }
    for (var i = 0; i < 3; i++) {
        if (checkColumn(board, i))
            return true;
    }
    if (checkDiagonals(board))
        return true;
    return false;
}
function checkState() {
    if (checkWin(boardState)) {
        alert("".concat(playerChar, " wins!"));
        reset();
        return true;
    }
    else if (isDraw(boardState)) {
        alert("DRAW!");
        reset();
        return true;
    }
    else
        return false;
}
function isDraw(board) {
    for (var _i = 0, board_1 = board; _i < board_1.length; _i++) {
        var row = board_1[_i];
        for (var _a = 0, row_1 = row; _a < row_1.length; _a++) {
            var cell = row_1[_a];
            if (cell === null)
                return false;
        }
    }
    return true;
}
var reset = function () {
    for (var _i = 0, cells_1 = cells; _i < cells_1.length; _i++) {
        var cell = cells_1[_i];
        cell.textContent = "";
    }
    for (var i = 0; i < 3; i++) {
        for (var j = 0; j < 3; j++) {
            boardState[i][j] = null;
        }
    }
    playerChar = userChar;
};
resetBtn.onclick = function () { return reset(); };
