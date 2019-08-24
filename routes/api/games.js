const router = require("express").Router();
const gamesController = require("../../controllers/gamesController");

// Matches with "/api/games", where id is the username
router.route("/:id")
  .get(gamesController.findAll)

// Matches with "/api/games"
router.route("/")
  .post(gamesController.create);

// Matches with "/api/games/:id"
router.route("/:id")
  .get(gamesController.findById)
  .put(gamesController.update)
  .delete(gamesController.remove);

module.exports = router;