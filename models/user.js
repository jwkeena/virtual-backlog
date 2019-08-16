const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    secret: { type: String, required: true },
    games: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Game'
        }
    ]
});

const User = mongoose.model("User", userSchema);

module.exports = User;