const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
    user: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    games: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Game'
        }
    ]
});

const User = mongoose.model("User", userSchema);

module.exports = User;