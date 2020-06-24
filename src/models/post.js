const mongoose = require('mongoose')

const postSchema = new mongoose.Schema({
    goodNote: {
        type: String
    },
    worries: {
        type: String 
    },
    color: {
        type: String
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    }
})

const Post = mongoose.model('Post', postSchema)

module.exports = Post