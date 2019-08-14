const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const gameSchema = new Schema({
  title: { type: String, required: true },
  system: { type: String, required: true },
  developer: String,
  notes: String,
  boxArt: String,
  description: String,
  favorite: Boolean,
  nowPlaying: Boolean, 
  owned: Boolean,
  rating: Number,
  price: Number,
  date: { type: Date, default: Date.now }
});

const Game = mongoose.model("Game", gameSchema);

module.exports = Game;
