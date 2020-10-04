const {updateGame} = require('./../db/updateGame');

const checkWinner = (matrix, row, column, player)=> {
    let i,j,k,count=4;
    
    // horizontal check
    i=column-3;
    j=column+3;
    if(i<0) {
        i=0;
    }
    if(j>6) {
        j=6;
    }
    for(k=i; k<=j; k++) {
        if(matrix[row][k] == player) {
            count -= 1;
        } else {
            count = 4;
        }
        if(count == 0) {
            return 1;
        }
    }

    count = 4;
    // vertical check
    i=row-3;
    j=row+3;
    if(i<0) {
        i=0;
    }
    if(j>5) {
        j=5;
    }
    for(k=i; k<=j; k++) {
        if(matrix[k][column] == player) {
            count -= 1;
        } else {
            count = 4;
        }
        if(count == 0) {
            return 1;
        }
    }

    count = 4;
    // Left diagonal check
    i=row-3;
    j=column-3;
    if(i<0) {
        i=0;
        j=column-row;
    }
    if(j<0) {
        j=0;
        i=row-column;
    }
    while(true) {
        if(matrix[i][j] == player) {
            count -= 1;
        } else {
            count = 4;
        }
        if(count == 0) {
            return 1;
        }
        i += 1;
        j += 1;
        if(i>5 || j>6) {
            break;
        }
    }

    count=4;
    // right diagonal check
    i=row-3;
    j=column+3;
    if(i<0) {
        i=0;
        j=row+column;
    }
    if(j>6) {
        j=6;
        i=row-(6-column);
    }
    while(true) {
        if(matrix[i][j] == player) {
            count -= 1;
        } else {
            count = 4;
        }
        if(count == 0) {
            return 1;
        }
        i += 1;
        j -= 1;
        if(i>5 || j<0) {
            break;
        }
    }
    return 0;
}

const nextMove = (column, game) => {
    let player = game.expected_turn;
    let {matrix} = game;
    let row;

    //Adding move
    for(let i=5; i>=0; i--) {
        if(matrix[i][column] == 0) {
            matrix[i][column] = player;
            row = i;
            break;
        }
    }

    let win = checkWinner(matrix, row, column, player);
    if(win == 1) {
        console.log(player + " winner!")
        game.winner = player;
        game.matrix = matrix;
        game.moves.push({player, row, column});
    } else {
        game.matrix = matrix;
        game.moves.push({player, row, column});
        if(player == 1){
            game.expected_turn = 2;
        } else {
            game.expected_turn = 1;
        }
    }

    updateGame(game);
    return win;

}

module.exports = {nextMove};