const router = require("express").Router();
const userController = require("../../controllers/userController");
const passport = require('../../passport');

// Matches with "/api/users"
router.route("/").post(userController.create);
router.route("/login").post(passport.authenticate("local"), function(req, res) {res.json(req.user.username)});

module.exports = router;