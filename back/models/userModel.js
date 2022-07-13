const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const user = mongoose.Schema({
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    admin: {type: Boolean, required: true, default: false}
});

user.plugin(uniqueValidator);

module.exports = mongoose.model("User", user);
