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
    }
})

const Post = mongoose.model('Post', postSchema)

module.exports = Post