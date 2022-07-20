const mongoose = require("mongoose"), Schema = mongoose.Schema;

const reaction = mongoose.Schema({
    user: {type: Schema.Types.ObjectId, ref: "User"}, 
    post: {type: Schema.Types.ObjectId, ref: "Post"}, 
    type: {
        type: String,
        enum : ["like", "dislike", "hate", null], 
    },
}
, {timestamps: true})
    

module.exports = mongoose.model("Reaction", reaction);