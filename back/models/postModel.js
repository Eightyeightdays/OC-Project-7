const mongoose = require("mongoose"), Schema = mongoose.Schema;

const post = mongoose.Schema({
    userId: {type: String, required: true},
    title: {type: String, required: true},
    content: {type: String, required: true},
    imageUrl: {type: String, required: true},
    reactions: [{type: Schema.Types.ObjectId, ref: "Reaction"}],
    dateCreated: {type: String, required: true},
    dateEdited: {type: String},  
    sortDate: {type: String, required: true}                          
})

module.exports = mongoose.model("Post", post);