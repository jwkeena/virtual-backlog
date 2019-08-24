import axios from "axios";

export default {
  // Finds games in the Giant Bomb database
  search: function(searchQuery) {
    return axios.get("/api/search/" + searchQuery)
  },
  
  // Saves a game to the database
  addGame: function(newGame) {
    return axios.post("/api/games", newGame);
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
  }
};
