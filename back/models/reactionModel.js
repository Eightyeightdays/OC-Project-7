const mongoose = require("mongoose");
const {Schema} = require("mongoose");

const reaction = Schema({
        user: {type: Schema.Types.ObjectId, ref: 'User'},
        post: {type: Schema.Types.ObjectId, ref: 'Post'},
        type: {
            type: String,
            enum: ['like', 'dislike'],
        },
    }) // created / updated automatically

module.exports = mongoose.model("Reaction", reaction);
