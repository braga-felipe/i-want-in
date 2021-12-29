const { model, Schema } = require('mongoose');

const userSchema = new Schema({
	username: String,
	password: String,
	email: String,
	created_at: Date,
	signedup_to: {
		type: Schema.Types.ObjectId,
		ref: 'lessons',
	},
});

module.exports = model('User', userSchema);
