const {Game} = require('./../models/game');

const findGame = (id) => {
    return Game.findById(id);
}

module.exports = {findGame};