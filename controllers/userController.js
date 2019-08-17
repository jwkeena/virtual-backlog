const db = require("../models");

// Defining methods for the usersController
module.exports = {
  create: function(req, res) {
    console.log("attempting to add to database", req.body);
    console.log(req.user);
    db.User
      .create(req.body)
      .catch(err => {
        console.log(err);
        res.json(err)
      })
      .then(dbModel => res.json(dbModel))
    
  }
};
