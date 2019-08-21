import axios from "axios";

export default {
  searchGame: function(searchQuery) {
    return axios.get("/api/search/" + searchQuery)
  },
  
  // Registers new user
  registerUser: function(newUser) {
    return axios.post("/api/users", newUser);
  },

  logout: function(username) {
    return axios.post("/api/users/logout", username);
  },

  // Gets all games from database
  getGames: function() {
    return axios.get("/api/games");
  },

  // Deletes the game with the given id
  deleteGame: function(id) {
    return axios.delete("/api/games/" + id);
  },

  // Saves a game to the database
  saveGame: function(gameData) {
    return axios.post("/api/games", gameData);
  }
};
