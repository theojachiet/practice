function GameBoard() {
    const boardSize = 3;
    let board = [[], [], []];

    for (let i = 0; i < boardSize; i++) {
        for (let j = 0; j < boardSize; j++) {
            board[i].push(Cell());
        }
    }

    const fillCell = (row, column, token) => {
        board[row][column].addValue(token);
    };

    const displayBoard = () => {
        return board.map((row) => row.map((cell) => cell.getValue()));
    };

    const resetBoard = () => {
        board.map((row) => row.map((cell) => cell.addValue(0)))
    };

    return { displayBoard, fillCell, resetBoard };
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

    const changeTurn = () => {
        if (currentPlayer === players[0]) currentPlayer = players[1];
        else currentPlayer = players[0];

        console.log(`It's ${currentPlayer.name}'s turn to play !`);
    };

    const playRound = (row, column) => {

        board.fillCell(row, column, currentPlayer.token);

        console.log(board.displayBoard());
        changeTurn();
    };

    return {playRound}

}

const board = GameBoard();

const game = GameFlow();