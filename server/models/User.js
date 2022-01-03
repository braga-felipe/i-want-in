const { model, Schema } = require('mongoose');

const userSchema = new Schema({
	first_name: String,
	last_name: String,
	email: String,
	phone: String,
	username: String,
	password: String,
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
