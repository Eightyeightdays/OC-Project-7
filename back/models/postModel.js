const mongoose = require("mongoose"), Schema = mongoose.Schema;

const post = mongoose.Schema({
    userId: {type: String, required: true},
    title: {type: String, required: true},
    content: {type: String, required: true},
    imageUrl: {type: String, required: true},
    reactions: [{type: Schema.Types.ObjectId, ref: "Reaction"}],
    reactionCount: {type: Number, required: true, default: 0},
    comments: {type: Array, required: true},   
    dateEdited: {type: String},                             
}, {timestamps: true})

module.exports = mongoose.model("Post", post);