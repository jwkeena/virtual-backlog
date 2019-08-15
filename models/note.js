const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const noteSchema = new Schema({
    noteText: String
});

const Note = mongoose.model("Note", noteSchema);

module.exports = Note;