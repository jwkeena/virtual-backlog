const router = require("express").Router();
const searchController = require("../../controllers/searchController");

// Matches with "/api/search"
router.route("/:id")
  .get(searchController.find)

module.exports = router;