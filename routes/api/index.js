const path = require("path");
const router = require("express").Router();
const gameRoutes = require("./games");
const userRoutes = require("./users");
const searchRoutes = require("./search")

// Game routes
router.use("/games", gameRoutes);

// User routes
router.use("/users", userRoutes);

// User routes
router.use("/search", searchRoutes);

// For anything else, render the html page
router.use(function(req, res) {
    res.sendFile(path.join(__dirname, "../../client/build/index.html"));
});

module.exports = router;