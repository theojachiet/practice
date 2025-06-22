function GameBoard() {
    const boardSize = 3;
    let board = [[], [], []];

    for (let i = 0; i < boardSize; i++) {
        for (let j = 0; j < boardSize; j++) {
            board[i].push(Cell());
        }
    }

    const fillCell = (row, column, token) => {
        if (board[row][column].getValue() !== 0) {

        }
        board[row][column].addValue(token);
    };

    const displayBoard = () => {
        return board.map((row) => row.map((cell) => cell.getValue()));
    };

    const checkEmptyCell = (row, column) => {
        if (board[row][column].getValue() === 0) return true;
        else return false;
    };

    const checkWin = () => {
        function isWinning(x, y, z, a, b, c) {
            return board[a][x].getValue() === board[b][y].getValue() && board[a][x].getValue() === board[c][z].getValue() && board[a][x].getValue() !== 0;
        }
        //Check for row win
        for (let i = 0; i < boardSize; i++) {
            if (isWinning(0, 1, 2, i, i, i)) {
                return true;
            }
        }

        //Check for column win
        for (let i = 0; i < boardSize; i++) {
            if (isWinning(i, i, i, 0, 1, 2)) {
                return true;
            }
        }

        //Check for diagonals
        if (board[0][0].getValue() === board[1][1].getValue() && board[0][0].getValue() === board[2][2].getValue() && board[0][0].getValue() !== 0) return true;
        if (board[0][2].getValue() === board[1][1].getValue() && board[0][2].getValue() === board[2][0].getValue() && board[0][2].getValue() !== 0) return true;

    };

    const checkTie = () => {
        for (let i = 0; i < boardSize; i++) {
            for (let j = 0; j < boardSize; j++) {
                if (board[i][j].getValue() === 0) {
                    return false;
                }
            }
        }
        return true;
    };

    const resetBoard = () => {
        board.map((row) => row.map((cell) => cell.addValue(0)))
    };

    const getBoard = () => board;

    return { displayBoard, fillCell, resetBoard, checkTie, checkWin, checkEmptyCell, getBoard };
}

function Cell() {
    let value = 0;

    const getValue = () => value;

    const addValue = (token) => {
        value = token;
    };

    return { getValue, addValue };
}

function GameFlow(name1 = 'player1', name2 = 'player2') {
    const board = GameBoard();
    const players = [{ name: name1, token: 1 }, { name: name2, token: 2 }];
    let currentPlayer = players[0];

    console.log(`It's ${currentPlayer.name}'s turn to play !`);

    const changeTurn = () => {
        if (currentPlayer === players[0]) currentPlayer = players[1];
        else currentPlayer = players[0];

        console.log(`It's ${currentPlayer.name}'s turn to play !`);
    };

    const playRound = (row, column) => {

        if (board.checkEmptyCell(row, column)) {
            board.fillCell(row, column, currentPlayer.token);
        } else {
            console.log(`Cell is already filled ! Choose another one.`);
            console.log(`It's ${currentPlayer.name}'s turn to play !`);
            return;
        }

        if (board.checkWin()) {
            console.log(`Game Over ! ${currentPlayer.name} wins !`);
        } else if (board.checkTie()) {
            console.log(`No space left, it's a tie !`);
        } else {
            console.log(board.displayBoard());
            changeTurn();
        }
    };

    return { playRound }
}

function ScreenController() {
    const game = GameFlow();
    const board = GameBoard();
    const boardDisplay = document.querySelector('.board');

    function updateScreen() {
        //display cells and values
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                const cell = document.createElement('button');
                cell.dataset.row = i;
                cell.dataset.column = j;
                cell.textContent = board.getBoard()[i][j].getValue();
                boardDisplay.appendChild(cell);
            }
        }

    }

    function eventHandler(e) {
        const selectedCol = e.target.dataset.column;
        const selectedRow = e.target.dataset.row;

        if (!selectedCol && !selectedRow) return;

        game.playRound(selectedRow, selectedCol);
    }
    boardDisplay.addEventListener('click', eventHandler);

    updateScreen();
}

const PlayerState = (function () {
    //TODO
})();

const board = GameBoard();

const game = GameFlow();

const screen = ScreenController();