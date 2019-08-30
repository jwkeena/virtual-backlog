import axios from "axios";

export default {
  // Finds games in the Giant Bomb database
  search: function(searchQuery) {
    return axios.get("/api/search/" + searchQuery)
  },
  
  // Gets all games from database
  getGames: function(username) {
    return axios.get("/api/games/" + username);
  },

  // Saves a game to the database
  addGame: function(newGame) {
    return axios.post("/api/games", newGame);
  },

  updateGame: function(id, propertyToUpdate) {
    return axios.put("/api/games/" + id, propertyToUpdate)
  },
  
  // Deletes the game with the given id
  deleteGame: function(id) {
    return axios.delete("/api/games/" + id);
  },

  // Registers new user
  registerUser: function(newUser) {
    return axios.post("/api/users", newUser);
  },

  logout: function(username) {
    return axios.post("/api/users/logout", username);
  },
};
