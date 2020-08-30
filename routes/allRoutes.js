const jwtVerification = require('./jwtVerification');
const router = require('express').Router();
const Game = require('../models/gameModel');
const User = require('../models/userModel');


router.post('/create/game', jwtVerification, async (req, res) => {
    const user = await User.findOne({
        email: req.user.email
    })
    if (!user) return res.json('Internal Server Error');


    if (!req.body.hosturl){
        const newGame = new Game({
            name: req.body.name,
            description: req.body.description,
            creator: user.username,
            imageURL: req.body.url,
            hostURL: ''
        });    
        await user.createdGames.push(newGame._id);

        await user.save().then().catch(err => {
            return res.json('Internal Server Error');
        });
        await newGame.save().then(doc => {
            return res.json(doc);
        }).catch(err => {
            console.log(1);
            return res.json('Internal Server Error');
        });  
    }else {
        const newGame = new Game({
            name: req.body.name,
            description: req.body.description,
            creator: user.username,
            imageURL: req.body.url,
            hostURL: req.body.hosturl
        });    
        console.log(newGame);
        await user.createdGames.push(newGame._id);

        await user.save().then().catch(err => {
            res.json('Internal Server Error');
        });
        await newGame.save().then(doc => {
            res.json(doc);
        }).catch(err => {
            console.log(1);
            res.json('Internal Server Error');
        }); 
         
    }
})

router.get('/game/:id', async (req, res) => {
    try {
        const gameid = req.params.id;
        const game = await Game.findOne({
            _id: gameid
        });
        if (!game) return res.json('Internal Server Error');
    
        res.json(game);
    } catch (error) {
        res.json('Internal Server Error');
    }  
})

router.get('/allgames', async (req, res) => {
    try {
        const game = await Game.find();
        if (!game) return res.json('Internal Server Error');
        res.json(game);
    } catch (error) {
        res.json('Internal Server Error');
    }
})

router.get('/mycreatedgames', jwtVerification ,async (req, res) => {
    const user = await User.findOne({
        email: req.user.email    
    });
    if (!user) return res.json('Internal Server Error');

    try {
        const games = await user.createdGames;
        if (!games) return res.json('User has not created any games yet.');
        const final = await Game.find({_id: {$in : games}})
        res.json(final);  
    } catch (error) {
        res.json('Internal Server Error');
    }
})

router.get('/myfavouritegames', jwtVerification ,async (req, res) => {
    const user = await User.findOne({
        email: req.user.email    
    });
    if (!user) return res.json('Internal Server Error');

    try {
        const games = await user.favouriteGames;
        if (!games) return res.json('No Favourites');
        const final = await Game.find({_id: {$in : games}})
        res.json(final);  
    } catch (error) {
        res.json('Internal Server Error');
    }
})

router.get('/:id/makefavourite', jwtVerification ,async (req, res) => {
    const user = await User.findOne({
        email: req.user.email    
    });
    if (!user) return res.json('Internal Server Error');
    try {
        const gameid = req.params.id;
        if (!gameid) return res.json('Internal Server Error');
        if (!user.favouriteGames.includes(gameid)){
            user.favouriteGames.push(gameid);
            await user.save().then(doc => {
                res.json('Added to Favourites');
            }).catch(err => {
                res.json('Internal Server Error');
            }); 
        }else {
            return res.json('Already in favourites');
        }
    } catch (error) {
        res.json('Internal Server Error');
    } 
})


router.get('/:id/removefavourite', jwtVerification ,async (req, res) => {
    const user = await User.findOne({
        email: req.user.email    
    });
    if (!user) return res.json('Internal Server Error');
    try {
        const gameid = req.params.id;
        if (!gameid) return res.json('Internal Server Error');
        if (user.favouriteGames.includes(gameid)){
            user.favouriteGames.pull(gameid);
            await user.save().then(doc => {
                res.json('Removed from favourites.');
            }).catch(err => {
                res.json('Internal Server Error');
            });
        }else {
            res.json('Already not a favourite.');
        }
    } catch (error) {
        res.json('Internal Server Error');
    } 
})


router.get('/:id/like', jwtVerification ,async (req, res) => {
    const user = await User.findOne({
        email: req.user.email    
    });
    if (!user) return res.json('Internal Server Error');
    try {
        const gameid = req.params.id;
        const game = await Game.findOne({
            _id: gameid
        });
        if (!game) return res.json('Internal Server Error');
        if (game.likedPeoples.includes(user._id)) {
            return res.json('Cannot like more than Once').status(403);
        }
        game.likes += 1;
        game.likedPeoples.push(user._id);
        await game.save().then(doc => {
            res.json(doc);
        }).catch(err => {
            res.json('Internal Server Error');
        }); 
    } catch (error) {
        res.json('Internal Server Error');
    } 
})

router.get('/:id/dislike', jwtVerification ,async (req, res) => {
    const user = await User.findOne({
        email: req.user.email    
    });
    if (!user) return res.json('Internal Server Error');
    try {
        const gameid = req.params.id;
        const game = await Game.findOne({
            _id: gameid
        });
        if (!game) return res.json('Internal Server Error');
        if (!game.likedPeoples.includes(user._id)) {
            return res.json('Cannot dislike a post without liking it first.');
        }
        game.likes -= 1;
        game.likedPeoples.remove(user._id);
        await game.save().then(doc => {
            res.json(doc);
        }).catch(err => {
            res.json('Internal Server Error');
        }); 
    } catch (error) {
        res.json('Internal Server Error');
    } 
})


module.exports = router;