const router = require("express").Router();
const userController = require("../../controllers/userController");
const passport = require('../../passport');

// Matches with "/api/users"
router.route("/").post(userController.create);
router.route("/login").post(passport.authenticate("local"), function(req, res) {res.json(req.user.username)});
router.route("/logout").post((req, res) => {
    console.log(req.body.username, " is logging out");
    if (req.body) {
        req.logout();
        res.send({ msg: 'Logout' })
    } else {
        res.send({ msg: 'No user to log out' })
    }
})

module.exports = router;