const express = require("express");
const mongoose = require("mongoose");
const session = require('express-session');
const passport = require('passport');
const routes = require("./routes");
const app = express();
const PORT = process.env.PORT || 3001;

// Middlware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(
  session({
  secret: 'the-real-transported-man', //pick a random string to make the hash that is generated secure
  resave: false,
  saveUninitialized: false
})
)
// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}
// Add routes, both API and view
app.use(routes);

// Passport
app.use(passport.initialize())
app.use(passport.session()) // calls serializeUser and deserializeUser

// Connect to the Mongo DB
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/virtualbacklog",
  {
    useCreateIndex: true,
    useNewUrlParser: true
  }
);

// Start the API server
app.listen(PORT, function() {
  console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
});
