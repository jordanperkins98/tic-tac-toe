
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
    function player (value){
        return {value};
    }

    const player1 = player('X');
    const player2 = player('O');
    let turn;
    let currentPlayer = player1;


    const currentGameBoard = gameBoard;

    const getCurrentPlayer = () => currentPlayer

    const switchPlayer = () => {

        currentPlayer === player1 ? currentPlayer = player2 : currentPlayer = player1;


        console.log("Current player: " + currentPlayer.value);
    }
    const play = (row, col) => {
        currentGameBoard.setBoard(row, col, currentPlayer);
        turn++;
    }

    const rowCheck = () =>{
        const diag1= [];
        const diag2= [];

        for(let i = 0; i < 3; i++){
            if (i === 0){
                diag1.push(currentGameBoard.getBoard()[i][0])
                diag2.push(currentGameBoard.getBoard()[i][2])
            }
            else if (i === 1){
                diag1.push(currentGameBoard.getBoard()[i][1])
                diag2.push(currentGameBoard.getBoard()[i][1])
            }
            else if (i === 2){
                diag1.push(currentGameBoard.getBoard()[i][2])
                diag2.push(currentGameBoard.getBoard()[i][0])
            }


            if ((currentGameBoard.getBoard()[i][0] === currentGameBoard.getBoard()[i][1] &&
                currentGameBoard.getBoard()[i][0] === currentGameBoard.getBoard()[i][2] &&
                currentGameBoard.getBoard()[i][0] !== "")) {
                console.log(`Winner!: ${currentPlayer.value}`);
                return 1
            }

            if (i === 2){
                for (let x = 0; x<3; x++){
                    if (diag1[x] !== diag1[x+1])
                        break
                    else if (x === 1 && diag1[x] !== "")
                        return 1
                }

                for (let x = 0; x<3; x++){
                    if (diag2[x] !== diag2[x+1])
                        break
                    else if (x === 1 && diag2[x] !== "")
                        return 1
                }
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
                else if (x === 1 && currentGameBoard.getBoard()[x][y] !== ""){
                    console.log(`Winner!: ${currentPlayer.value}`);
                    return 1
                }
            }
        }

        return 0
    }

    const checkWin = () => {
        let rowWin, colWin;

        if (turn >= 5){
           rowWin = rowCheck();
           colWin = columnCheck();
        }

        if (rowWin+colWin > 0){
            console.log(`rowWin: ${rowWin}  colWin: ${colWin}`)
            endGame();
            return true
        }
        return false

    }

    const getTurn = ()=> turn;

    const endGame = () =>{


    }

    const startGame = () => {
        console.log("Welcome to Tic-Tac-Toe")
        currentPlayer = player1;
        turn = 0;
        gameBoard.resetGameBoard();
        displayController.resetEventListeners();
        displayController.renderBoard();
    }

    return{startGame, getCurrentPlayer, switchPlayer, play, checkWin,getTurn}
})();



const displayController = (function (){
    const board = document.querySelector('.board');
    const tiles = document.querySelectorAll('.tile');

    const playerText = document.querySelector("#player");
    const boardText = document.querySelector(".board-text");
    const playAgain = document.querySelector('.play-again');
    const restart = document.querySelector('.restartButton');

    const scores = document.querySelector('.scores');


    const togglePlayAgain = ()=>{
        playAgain.classList.toggle('hidden');
        restart.classList.toggle('hidden');
    }

    playAgain.addEventListener('click',() =>{
        gameFlow.startGame();
        boardText.textContent = `Current Player: ${gameFlow.getCurrentPlayer().value}`
        togglePlayAgain();

    })

    restart.addEventListener('click',() =>{
        gameFlow.startGame();


    })

    function handleTileClick(e){
        const row = e.target.dataset.row;
        const col = e.target.dataset.col;
        gameFlow.play(row,col)
        renderBoard();
        if(gameFlow.checkWin()){
            boardText.textContent = `Winner is: ${gameFlow.getCurrentPlayer().value}!`
            const score = document.createElement('div');
            score.classList.add('score')
            score.innerHTML =`
                <p>Winner: ${gameFlow.getCurrentPlayer().value}</p>          
            `
            scores.appendChild(score);
            clearEventListeners()
            togglePlayAgain();
        }
        else {
            if (gameFlow.getTurn() === 9){
                togglePlayAgain();
                boardText.textContent = 'The game ended in a draw!'
                const score = document.createElement('div');
                score.classList.add('score')
                score.innerHTML =`
                <p>Draw</p>          
            `
                scores.appendChild(score);

            }
            gameFlow.switchPlayer();
            playerText.textContent = gameFlow.getCurrentPlayer().value
        }

    }


    const resetEventListeners = () => {
        tiles.forEach((element) => {
            element.addEventListener('click', handleTileClick,{once:true})
        })
    }

    const clearEventListeners = ()=>{
        tiles.forEach((element) => {
            element.removeEventListener('click', handleTileClick)
        })

    }

    const renderBoard = () =>{

        playerText.textContent = gameFlow.getCurrentPlayer().value;
        const board = gameBoard.getBoard().join().split(",");

        for(let tile = 0; tile < 9; tile++){
            tiles[tile].textContent = board[tile]
        }

    }

    return {resetEventListeners,renderBoard}
})();


gameFlow.startGame();



