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

// Matches with "api/games/note/:id"
router.route("/note/:id")
  .put(gamesController.updateNote)

// Matches with "api/games/tag/:id"
router.route("/tag/:id")
  .put(gamesController.addNewTag)

router.route("/tag/delete/:id")
  .put(gamesController.deleteTag)

module.exports = router;