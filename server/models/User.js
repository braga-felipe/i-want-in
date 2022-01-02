const { model, Schema } = require('mongoose');

const userSchema = new Schema({
	username: String,
	password: String,
	email: String,
	created_at: Date,
	classes: [
		{
			id: String,
			title: String,
		},
	],
	signedup_to: [
		{
			id: String,
			title: String,
			teacher: String,
		},
	],
});

module.exports = model('User', userSchema);
