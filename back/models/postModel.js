const mongoose = require("mongoose"), Schema = mongoose.Schema;

const post = mongoose.Schema({
    userId: {type: String, required: true},
    title: {type: String, required: true},
    content: {type: String, required: true},
    imageUrl: {type: String, required: true},
    likes: {type: Number, required: true, default: 0},
    dislikes: {type: Number, required: true, default: 0},
    comments: {type: Array, required: true},                                // EXTRA
    usersLiked: {type: Array, required: true},
    usersDisliked: {type: Array, required: true},
    reactions: [{type: Schema.Types.ObjectId, ref: "Reaction"}],
    datePosted: {type: Number, required: true, default: " "},
    displayDatePosted: {type: String, required: true},
    displayDateEdited: {type: String, default: null},
})

module.exports = mongoose.model("Post", post);