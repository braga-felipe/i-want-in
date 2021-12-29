const { model, Schema } = require('mongoose');

const lessonSchema = new Schema({
	title: String,
	description: String,
	location: String,
	time: String,
	created_at: String,
	teachers: {
		type: Schema.Types.ObjectId,
		ref: 'users',
	},
	students: {
		type: Schema.Types.ObjectId,
		ref: 'users',
	},
});

module.exports = model('Lesson', lessonSchema);
