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
        type: String
    },
    createdGames: [{
        type: mongoose.Types.ObjectId,
        ref: 'Game'
    }],
    favouriteGames: [{
        type: mongoose.Types.ObjectId,
        ref: 'Game'
    }]
});

module.exports = mongoose.model('User', userSchema);
