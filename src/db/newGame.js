const {Game} = require('./../models/game');

const newGame = () => {
    let data = {
        winner: null,
        expected_turn: 1,
        matrix: [   
            [0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0]
        ],
        moves: [],

    }
    let addGame = new Game(data);
    return addGame.save();
};

module.exports = {newGame};