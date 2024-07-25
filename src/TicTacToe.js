

class Board {
    constructor() {
        this.grid = [
            [" ", " ", " "],
            [" ", " ", " "],
            [" ", " ", " "]
        ];
        
        this.corners = [
            [0,0],
            [2,2],
            [0,2],
            [2,0]
        ]
        let winner = null;
    }
    display() {   
        for (let r = 0; r < 3; r++) {
            let row = '';
            for (let c = 0; c < 3; c++) {
                row +=  this.grid[r][c]; + ' ';
                if (c != 2) {
                    row += ' | ';
                }
            }
            console.log(row);
            row = '';
            if (r != 2) {
                console.log("==========");
            }
        }
        console.log();
    }
    move(num, player) {
        const r = Math.floor((num - 1) / 3);
        const c = (num - 1) % 3;
        

        if (typeof num !== 'undefined') {
            this.grid[r][c] = player;           
        }
    }
    getPossibleMoves() {
        let temp = [];
        let count = 1;
        
        for (let r = 0; r < 3; r++) {
            for (let c = 0; c < 3; c++) {
                
                if (this.grid[r][c] == ' ') {
                    temp.push(count);
                }
                count++;
            }
        } 
        if (temp.includes(0)) {
            console.log('possible moves has 0!!!');
        }
        return temp;
    }
    isValidMove(move) {
        return this.getPossibleMoves().includes(move);
    }
    checkStraights(player, streak, across) {
        
        let total = 0;   
        for (let i = 0; i < 3; i++) {
            let count = 0;
            for (let j = 0; j < 3; j++) {
                

                const check = across ? this.grid[i][j] : this.grid[j][i];

                if (check == player) {
                    count++;
                   
                }else if (check != ' ') {
                    count = 0;
                    break;  
                }
            }

            if (count == streak) {
                total++; 
            }        
        }
        return total;
    }
    checkDiagnols(player, streak) {
        let total = 0;
        if (streak == 3) {
            if (this.grid[1][1] == player &&
                   ((this.grid[0][0] == player && this.grid[2][2] == player) ||
                   (this.grid[0][2] == player && this.grid[2][0] == player))) {
                    return 1;
            }else {
                return 0;
            }
        }else if (this.grid[1][1] != player && this.grid[1][1] != ' ') {
            return 0;
        }else {
            const opp = (player == 'X') ? 'O' : 'X';
            let d1 = this.grid[0][0] + this.grid[1][1] + this.grid[2][2];
            let d2 = this.grid[0][2] + this.grid[1][1] + this.grid[2][0];
            const diagnols = [d1,d2];
            diagnols.forEach(item => {
                if (!item.includes(opp)) {
                    let count = 0;
                    for (let char of item) {
                        if (char == player) {
                            count++;
                        }
                    }
                    if (count >= streak) {
                        total++;
                    }
                }
            });
        }
            
        

        
        return total;   
    } 
    checkInRow(player, streak) {
        return this.checkStraights(player, streak, true) + 
               this.checkStraights(player, streak, false) +
               this.checkDiagnols(player, streak);
    }
    checkWin(player) {
        return this.checkStraights(player, 3, true) +
               this.checkStraights(player, 3, false) +
               this.checkDiagnols (player, 3) >= 1;                  
    }


    setGrid(grid) {
        for (let r = 0; r < 3; r++) {
            for (let c = 0; c < 3; c++) {
                this.grid[r][c] = grid[r][c]
            }
        }
    }   
    copy() {
        const copy = new Board();
        copy.setGrid(this.grid);
        
        return copy;
    }
    gameOver() {
        
        if (this.checkWin('X')) {
            this.winner = 'X';
            return true;
        }else if (this.checkWin('O')) {
            this.winner = 'O';
            return true;
        }else if (this.getPossibleMoves().length <= 0){
            this.winner = "T"
            return true;
        }else {
            return false;
        }
         
    }

    getWinner() {
        this.gameOver()
        return this.winner;
    }

   
}


function evaluate(board) {
    let score = 0;
    if (board.checkWin('X')) {
        score += 1000;
    }
    if (board.checkWin('O')) {
        score += -1000;
    }

    return score
    
    
}
    
function minimax(board, depth, maximizingPlayer) {
    
    if (depth == 0 || board.gameOver()) {
        return evaluate(board) * depth;
    }

    const possibleMoves = board.getPossibleMoves();
    if (maximizingPlayer) {
       let maxEval = -Infinity;
        for (let i = 0; i < possibleMoves.length; i++) {
            const temp_board = board.copy()

            const move = possibleMoves[i];
            temp_board.move(move, 'X');
            
            let eval_value = minimax(temp_board, depth - 1, false);

            if (eval_value > maxEval) {
                maxEval = eval_value;
            }
        }
        return maxEval;
    }else {
        let minEval = Infinity;
        for (let i = 0; i < possibleMoves.length; i++) {
            const temp_board = board.copy();
            const move = possibleMoves[i];
            temp_board.move(move, 'O');
            
            let eval_value = minimax(temp_board, depth -1, true);

            if (eval_value < minEval) {
                minEval = eval_value;
            }
        }
        return minEval;
    }
    
}


function arrayToGrid(array) {
    
    let grid = []
    let row = []
    for (const i in array) {
        row.push(array[i])
        
        if (row.length == 3) {
            grid.push(row)
            row = []
            
        }
    }
    
    return grid;
}




function getBestMove(array, maximizingPlayer) {
    
    
    let grid = arrayToGrid(array);
   
    const board = new Board();
    board.setGrid(grid)
   
    
    let bestMove = null;
    let bestValue = maximizingPlayer ? -Infinity : Infinity;
    let possibleMoves = board.getPossibleMoves();
    if (possibleMoves.length < 9) {
        possibleMoves = possibleMoves.reverse()
    }
   
    board.display();
    const depth = possibleMoves.length;

    

    for (let i = 0; i < possibleMoves.length; i++) {
        const temp_board = board.copy();
        
        const move = possibleMoves[i];

        temp_board.move(move, (maximizingPlayer ? 'X' : 'O'));

        const minimax_value = minimax(temp_board, depth, !maximizingPlayer);
        if (maximizingPlayer) {
            if (minimax_value > bestValue) {
                bestValue = minimax_value;
                bestMove = move;
            }
        }else {
            if (minimax_value < bestValue) {
                bestValue = minimax_value;
                bestMove = move
            }
        }
        
       
        
        
    }
    return bestMove;
}

function gameResult(array) {
    let grid = arrayToGrid(array);
   
    const board = new Board();
    board.setGrid(grid)
    console.log("Board winner is "+board.getWinner());
    return board.getWinner();
   
}



export {Board, getBestMove, gameResult}












