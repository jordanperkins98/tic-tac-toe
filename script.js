
const gameBoard = (function (){
    let board = [];

    for (let i = 0; i < 3; i++) {
        let row = [];
        for (let j = 0; j < 3; j++) {
            row.push('');
        }
        board.push(row);
    }

    const resetGameBoard = () => {
        board = [];
        for (let i = 0; i < 3; i++) {
            let row = [];
            for (let j = 0; j < 3; j++) {
                row.push('');
            }
            board.push(row);
        }
    };

    const getBoard = () => board;

    const setBoard = (row, col, player) => {

        if (board[row-1][col-1] === '' && player.value !== undefined){
            board[row-1][col-1] = player.value;
        }
    }

    return {getBoard, setBoard, resetGameBoard};
})();

const gameFlow = ( function (){
    const player1 = player('X');
    const player2 = player('O');
    let turn = 0;
    let currentPlayer = player1;

    const currentGameBoard = gameBoard;

    const switchPlayer = () => {
        currentPlayer === player1 ? currentPlayer = player2 : currentPlayer = player1;
        console.log("Current player: " + currentPlayer.value);
    }
    const play = (row, col) => {
        currentGameBoard.setBoard(row, col, currentPlayer);
        turn++;
    }

    const rowCheck = () =>{
        for(let i = 0; i < 3; i++){
            if (currentGameBoard.getBoard()[i][0] === currentGameBoard.getBoard()[i][1] && currentGameBoard.getBoard()[i][0] === currentGameBoard.getBoard()[i][2]) {
                console.log(`Winner!: ${currentPlayer}`);
                return 1
            }
        }
        return 0
    }

    const columnCheck = () =>{
        // loop over 0-2 for column number
        for(let y = 0; y < 3; y++){
            //loop through each row
            for(let x = 0; x < 3; x++){
                if (currentGameBoard.getBoard()[x][y] !== currentGameBoard.getBoard()[x+1][y]){
                    break;
                }
                else if (x === 1){
                    console.log(`Winner!: ${currentPlayer}`);
                    return 1
                }
            }
        }
        return 0
    }

    const checkWin = () => {
        let rowWin, colWin;

        if (turn >= 5){
          const rowWin = rowCheck();
          const colWin = columnCheck();
        }

        if (rowWin+colWin > 0){
            return 1;
        }
        return 0

    }

    const endGame = () =>{
        console.log(`Winner is: ${currentPlayer}`);
    }

    const startGame = () => {
        console.log("Welcome to Tic-Tac-Toe")
        for (let i = 0; i <= 9; i++){
            const input = prompt(`${currentPlayer.value} where would you like to play? row column`)
            const inputArr = input.split(" ");
            play(inputArr[0], inputArr[1]);
            if (checkWin() === 1) {
                endGame();
                break;
            }
            console.log(gameBoard.getBoard());
            switchPlayer();
        }
    }


    return{checkWin, startGame}


})();

function player (value){
     return {value};
}

gameFlow.startGame();



