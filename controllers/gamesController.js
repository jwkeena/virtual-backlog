const db = require("../models");

// Defining methods for the gamesController
module.exports = {
  findAll: function(req, res) {
    db.Game
      .find(req.query)
      .sort({ date: -1 })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  create: function(req, res) {
    const newGame = req.body
    db.User.findOne({username: req.body.username}, // First, get the user's unique id as stored in mongoDB
      function(err, dbUser) { 
        if (err) {
          console.log(err);
        } else {
          const id = dbUser._id; // Then add an owner property to the newGame object so it can be properly associated with the user later, in .populate
          newGame.owner = id;
          db.Game
            .create(req.body)
            .then(dbGame => res.json(dbGame))
            .catch(err => 
              console.log(err));
        }; 
      })
  },
  findById: function(req, res) {
    db.Game
      .findById(req.params.id)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  update: function(req, res) {
    db.Game
      .findOneAndUpdate({ _id: req.params.id }, req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  remove: function(req, res) {
    db.Game
      .findById({ _id: req.params.id })
      .then(dbModel => dbModel.remove())
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  }
};
