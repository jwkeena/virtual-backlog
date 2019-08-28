require("dotenv").config();
const axios = require("axios");
const key = process.env.GIANT_BOMB_API;
  
// Defining methods for the searchController
module.exports = {
    find: function(req, res) {
        
        console.log("Finding in Giant Bomb", req.params.id)
        axios
            .get("https://www.giantbomb.com/api/search?api_key=" + key + "&format=json&query=" + req.params.id + "&resources=game&limit=50")
            .then(response => {
                console.log(response.data.results);
                res.json(response.data.results)
                })
            .catch(error => {
                console.log(error);
              });
        }
  };