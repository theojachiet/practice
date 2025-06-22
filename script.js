function GameBoard() {
    const boardSize = 3;
    let board = [[],[],[]];

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

    console.log(displayBoard());
}

function Cell() {
    let value = 1;

    const getValue = () => value;

    const addValue = (token) => {
        value = token;
    };

    return {getValue, addValue};
}

function GameFlow() {

}

GameBoard();