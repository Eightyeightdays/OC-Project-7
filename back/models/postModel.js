const mongoose = require("mongoose");

const post = mongoose.Schema({
    userId: {type: String, required: true},
    title: {type: String, required: true},
    content: {type: String, required: true},
    imageUrl: {type: String, required: true, default: " "},
    likes: {type: Number, required: true, default: 0},
    dislikes: {type: Number, required: true, default: 0},
    comments: {type: Array, required: true},                                // EXTRA
    usersLiked: {type: Array, required: true},
    usersDisliked: {type: Array, required: true},
    datePosted: {type: String, required: true, default: " "},
    dateEdited: {type: String, required: true, default: null},
})

module.exports = mongoose.model("Post", post);