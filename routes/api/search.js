const router = require("express").Router();
const searchController = require("../../controllers/searchController");

// Matches with "/api/search/detail/:id" (RAWG game ID)
router.route("/detail/:id")
  .get(searchController.detail)

// Matches with "/api/search/:id"
router.route("/:id")
  .get(searchController.find)

module.exports = router;