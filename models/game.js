const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const gameSchema = new Schema({
  owner: { type: Schema.ObjectId, ref: 'User', required: true },
  title: { type: String, required: true },
  system_type: { type: String, required: true },
  physical: {type: Boolean, required: true },
  box_art: String,
  description: String,
  note: String,
  guid: String,
  year_released: Number,
  favorite: Boolean,
  backlog: Boolean,
  is_beaten: Boolean,
  cib: Boolean,
  now_playing: Boolean, 
  wishlist: Boolean,
  points: Number,
  gb_url: String,
  tags: Array,
  date: { type: Date, default: Date.now }
});

const Game = mongoose.model("Game", gameSchema);

module.exports = Game;
