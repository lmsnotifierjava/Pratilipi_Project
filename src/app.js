const express = require('express');
const bodyParser = require('body-parser');
const ObjectID = require('mongoose').Types.ObjectId;

const {mongoose} = require('./db/mongoose');
const {newGame} = require('./db/newGame');
const {findGame} = require('./db/findGame');

const {nextMove} = require('./game/nextMove');

let app = express();

// Middleware to process JSON data
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.status(200).send('<p>Pratilipi Hiring Challenge | Connect-4 | by: Shivam Sharma</p><br><p>Routes:</p><p>@GET /start</p><p>@GET /game/:id</p><p>@POST /game/:id</p>');
});

app.get('/start', (req, res) => {
    newGame().then(doc => {
        res.status(200).json({
            message: "Ready",
            token: doc._id
        });
        doc._id;
    }).catch(error => {
        console.log(`Problem while adding New Game.` + err);
        res.status(400).json({
            message: "error",
            error
        });
    });``
});

app.get('/game/:id', (req, res) => {
    let id = req.params.id || null;

    // If id is not provided
    if(!id) {
        return res.status(400).json({
            message: "error",
            error: "Game Id not provided in the url"
        });
    }

    //if id is invalid
    if(!ObjectID.isValid(id)){
        return res.status(400).json({
            message: "error",
            error: "Invalid Game Id!"
        });
    }

    findGame(id).then((game) => {
        if(!game){
            return res.status(404).json({
                message: "error",
                error: "Game Id! not found!"
            });
        }
        res.status(200).json({game});
    }, (error) => {
        res.status(400).json({
            message: "error",
            error
        });
    });
});

app.post('/game/:id', (req, res) => {
    let id = req.params.id || null;
    let {column} = req.body || -1;

    // If id is not provided
    if(!id) {
        return res.status(400).json({
            message: "error",
            error: "Game Id not provided in the url"
        });
    }

    //if id is invalid
    if(!ObjectID.isValid(id)){
        return res.status(400).json({
            message: "error",
            error: "Invalid Game Id!"
        });
    }

    if(column == -1) {
        return res.status(400).json({
            message: "error",
            error: "Please provide the required body elemet (column)"
        });
    }

    if(column<0 || column>6) {
        return res.status(400).json({
            message: "error",
            error: "Invalid column number (range: 0-6)"
        });
    }
    
    // Check existance of the Game ID in the DataBase
    findGame(id).then((game) => {
        if(!game){
            return res.status(404).json({
                message: "error",
                error: "Game Id! not found!"
            });
        }
        if(game.winner) {
            return res.status(400).json({
                message: "error",
                error: "Game already finished!",
                report: game
            });
        }

        //validating move, if column full
        if(game.matrix[0][column] != 0) {
            return res.status(200).json({
                message: "invalid"
            });
        }

        // Checking for further moves
        let win = nextMove(column, game);
        if(win == 1) {
            if(game.expected_turn == 1) {
                res.status(200).json({
                    message: "Yellow wins !!!"
                });
            } else {
                res.status(200).json({
                    message: "Red wins !!!"
                });
            }
        } else {
            res.status(200).json({
                message: "valid"
            });
        }        
    }, (error) => {
        res.status(400).json({
            message: "error",
            error
        });
    });
});

const port = process.env.PORT || 2000;

app.listen(port, () => {
    console.log(`Server started successfully on port ${port}`);
})