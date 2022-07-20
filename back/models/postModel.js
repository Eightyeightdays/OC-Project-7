const mongoose = require("mongoose");
const {Schema} = require("mongoose");

const post = Schema({
    userId: {type: String, required: true},
    title: {type: String, required: true},
    content: {type: String, required: true},
    imageUrl: {type: String, required: true},
    comments: {type: Array, required: true},                                // EXTRA
}, {timestamps: true})

module.exports = mongoose.model("Post", post);
