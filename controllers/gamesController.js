const db = require("../models");

// Defining methods for the gamesController
module.exports = {
  
  findAll: function(req, res) {
    db.User
      .findOne({username: req.params.id}, // Pass in username from request, then find user's unique id
        function(err, dbUser) { 
          if (err) {
            console.log(err);
          } else {
            const id = dbUser._id;
            db.Game
              .find({owner: id}) // Using the id, find all games with that owner
              .then(collection => res.json(collection)) // Return all games to client side
              .catch(err => 
                console.log(err));
          }; 
        })
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
    const property = req.body.property;
    let updatedValue = !req.body.currentValue;
    db.Game
      .findOneAndUpdate({ _id: req.params.id }, updatedValue, function (err, game) {
        if (err) {
          console.log(err)
        } else {
          game[property] = !game[property];
          game.save(function(err, updatedGame) {
            if (err) {
              console.log(err)
            } else {
              console.log(updatedGame)
            }
          })
        }     
      })
      .then(dbModel => res.json(dbModel))
      .catch(err => console.log(err));
  },
  updateNote: function(req, res) {
    db.Game
      .findOneAndUpdate({ _id: req.params.id }, req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => console.log(err));
  },
  addNewTag: function(req, res) {
    db.Game
      .findOneAndUpdate({ _id: req.params.id }, 
        {$push: {tags: req.body.tag}},
        {safe: true, upsert: true})
      .then(dbModel => res.json(dbModel))
      .catch(err => console.log(err));
  },
  deleteTag: function(req, res) {
    db.Game
      .findOneAndUpdate({ _id: req.params.id }, 
        {$pull: {tags: req.body.tag}},
        {safe: true, upsert: true})
      .then(dbModel => res.json(dbModel))
      .catch(err => console.log(err));
  },
  remove: function(req, res) {
    db.Game
      .findById({ _id: req.params.id })
      .then(dbModel => dbModel.remove())
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  }
};
