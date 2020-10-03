const {Game} = require('./../models/game');

const updateGame = (game) => {
    Game.findByIdAndUpdate(game._id, {$set: game}, {new: true}).then((game) => {
        console.log(game);
    }, (e) => {
        console.log(e);
    });
};

module.exports = {updateGame};