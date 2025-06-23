function GameBoard() {
    const boardSize = 3;
    let board = [[], [], []];

    for (let i = 0; i < boardSize; i++) {
        for (let j = 0; j < boardSize; j++) {
            board[i].push(Cell());
        }
    }

    const fillCell = (row, column, token) => {
        if (checkWin() || checkTie()) {
            return; //Can't drawn when game is over
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

        return false;
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

function GameFlow(boardImport, name1 = 'player1', name2 = 'player2') {
    const board = boardImport;
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

    const getCurrentPlayer = () => currentPlayer;

    return { playRound, getCurrentPlayer }
}

function ScreenController() {
    const board = GameBoard();
    const game = GameFlow(board);
    const boardDisplay = document.querySelector('.board');

    const updateScreen = () => {
        //Update turn text
        const turnText = document.querySelector('.turn');
        let currentPlayer = game.getCurrentPlayer();

        //Reset Board to not draw previous values
        boardDisplay.textContent = '';

        console.log(board.checkWin());
        if (board.checkWin()) {
            turnText.textContent = `Game Over ! ${currentPlayer.name} wins !`;
        } else if (board.checkTie()) {
            turnText.textContent = `Game Over ! It's a tie !`;
        } else {
            turnText.textContent = `It's ${currentPlayer.name}'s turn !`;
        }

        //display cells and values
        board.getBoard().forEach((row, indexRow) =>
            row.forEach((cell, indexCol) => {
                const cellButton = document.createElement('button');
                cellButton.dataset.row = indexRow;
                cellButton.dataset.column = indexCol;

                if (cell.getValue() === 2) {
                    cellButton.textContent = 'O';
                } else if (cell.getValue() === 1) {
                    cellButton.textContent = 'X';
                } else if (cell.getValue() === 0) {
                    cellButton.textContent = '';
                }

                boardDisplay.appendChild(cellButton);
            }));
    }

    function eventHandler(e) {
        const selectedCol = e.target.dataset.column;
        const selectedRow = e.target.dataset.row;

        if (!selectedCol && !selectedRow) return;

        game.playRound(selectedRow, selectedCol);
        updateScreen();
    }
    boardDisplay.addEventListener('click', eventHandler);

    updateScreen();
}

function DialogHandler() {
    const dialog = document.querySelector('dialog');
    // const closeButton = document.querySelector('.close');
    const startButton = document.querySelector('.start');

    startButton.addEventListener('click', () => {
        const player1name = document.querySelector('#player1');
        const player2name = document.querySelector('#player2');
    });
    dialog.showModal();
}

const PlayerState = (function () {
    //TODO
})();

const screen = ScreenController();
const dialog = DialogHandler();