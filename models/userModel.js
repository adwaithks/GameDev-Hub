const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required:true,
        min: 4
    },
    pwdResetToken: {
        type: String,
        default: null
    },
    password: {
        type: String,
        required: true,
        min: 6
    },
    popularity: {
        type: Number
    },
    signal: {
        type: Number
    },
    noOfCreatedGames: {
        type: Number,
        default: 0
    },
    rating: {
        type: Number
    },
    createdGames: [{
        type: mongoose.Types.ObjectId,
        ref: 'Game'
    }],
    favouriteGames: [{
        type: mongoose.Types.ObjectId,
        ref: 'Game'
    }],
    likedGames: [{
        type: mongoose.Types.ObjectId,
        ref: 'Games'
    }],
    purchasedGames: [{
        type: mongoose.Types.ObjectId,
        ref: 'Games'
    }]
});

module.exports = mongoose.model('User', userSchema);
