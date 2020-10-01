const mongoose = require('mongoose');

GameSchema = new mongoose.Schema({
    winner: {
        type: String,
        default: null
    },
    expected_turn: {
        type: Number,
        default: 1
    },
    matrix: [[]],
    moves: [{
        player: {
            type: Number
        },
        row: {
            type: Number
        },
        column: {
            type: Number
        }
    }]
});

var Game = mongoose.model('Game', GameSchema);

module.exports = {Game};