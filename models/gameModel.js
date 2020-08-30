const mongoose = require('mongoose');

const gameSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required:true,
        max: 54
    },
    creator: {
        type: String    
    },
    likes: {
        type: Number,
        default: 0
    },
    likedPeoples: [{
        type: mongoose.Types.ObjectId,
        ref: 'User'
    }],
    imageURL: {
        type: String,
        required: true
    },
    hostURL: {
        type: String
    }
});

module.exports = mongoose.model('Game', gameSchema);
