const mongoose = require('mongoose');

const MovieSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    folderName: {
        type: String,
        required: true
    },
    size: {
        type: Number
    },
    lastPosition: {
        type: Number,
        default: 0
    }
});

module.exports = mongoose.model('Movie', MovieSchema);
