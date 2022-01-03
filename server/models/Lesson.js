const { model, Schema } = require('mongoose');

const lessonSchema = new Schema({
	title: String,
	description: String,
	location: String,
	time: String,
	created_at: String,
	teachers: [
		{
			id: String,
			username: String,
		},
	],
	students: [
		{
			id: String,
			username: String,
		},
	],
});

module.exports = model('Lesson', lessonSchema);
