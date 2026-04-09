const db = require('../models');
const LocalStrategy = require('passport-local').Strategy;

const strategy = new LocalStrategy(
	{
		usernameField: 'username', // not necessary, DEFAULT
	},
	async function(username, password, done) {
		try {
			const user = await db.User.findOne({ username: username });
			if (!user) {
				return done(null, false, { message: 'Incorrect username' });
			}
			if (!user.checkPassword(password)) {
				return done(null, false, { message: 'Incorrect password' });
			}
			return done(null, user);
		} catch (err) {
			return done(err);
		}
	}
)

module.exports = strategy;