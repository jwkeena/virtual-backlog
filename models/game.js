const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const gameSchema = new Schema({
  title: { type: String, required: true },
  system_type: { type: String, required: true },
  physical: {type: Boolean, required: true },
  developer: String,
  box_art: String,
  description: String,
  is_beaten: Boolean,
  favorite: Boolean,
  now_playing: Boolean, 
  wishlist: Boolean,
  backlog: Boolean,
  cib: Boolean,
  price: Number,
  year_released: Number,
  points: Number,
  similar: Array,
  date: { type: Date, default: Date.now },
  // `note` is an object that stores a Note id
  // The ref property links the ObjectId to the Note model
  // This allows us to populate the Article with an associated Note
  note: {
    type: Schema.Types.ObjectId,
    ref: "Note"
  }
});

const Game = mongoose.model("Game", gameSchema);

module.exports = Game;
