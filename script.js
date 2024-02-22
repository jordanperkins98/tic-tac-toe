
function gameBoard (){
    let board = [];

    for (let i = 0; i < 3; i++){
        let row = [];
        for (let j = 0; j < 3; j++){
            row.push('');
        }
        board.push(row);
    }

    const getBoard = () => board;

    const setBoard = (row, col, player) => {

        if (board[row][col] === '' && player.value !== undefined){
            board[row][col] = player.value;
        }
    }

    return {getBoard, setBoard};
}

function player (value){
     return {value};
}


const player1 = player('X');
const player2 = player('O');
const game = gameBoard();


