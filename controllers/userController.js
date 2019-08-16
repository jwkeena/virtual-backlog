const db = require("../models");

// Defining methods for the usersController
module.exports = {
  create: function(req, res) {
    console.log("attempting to add to database", req.body);
    db.User
      .create(req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  }
};
