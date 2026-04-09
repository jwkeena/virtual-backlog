const db = require("../models");

// Defining methods for the gamesController
module.exports = {
  
  findAll: async function(req, res) {
    try {
      const dbUser = await db.User.findOne({username: req.params.id});
      const collection = await db.Game.find({owner: dbUser._id});
      res.json(collection);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
  create: async function(req, res) {
    try {
      const dbUser = await db.User.findOne({username: req.body.username});
      req.body.owner = dbUser._id;
      const dbGame = await db.Game.create(req.body);
      res.json(dbGame);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
  findById: function(req, res) {
    db.Game
      .findById(req.params.id)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  update: async function(req, res) {
    try {
      const property = req.body.property;
      const game = await db.Game.findOne({ _id: req.params.id });
      game[property] = !game[property];
      const updatedGame = await game.save();
      console.log(updatedGame);
      res.json(updatedGame);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
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
  remove: async function(req, res) {
    try {
      const dbModel = await db.Game.findByIdAndDelete(req.params.id);
      res.json(dbModel);
    } catch (err) {
      res.status(422).json(err);
    }
  }
};
