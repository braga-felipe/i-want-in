const { model, Schema } = require('mongoose');

const lessonSchema = new Schema({
	title: String,
	description: String,
	location: String,
	time: String,
	created_at: String,
	teacher_name: String,
	teacherId: {
		type: Schema.Types.ObjectId,
		ref: 'users',
	},
	students: [
		{
			id: String,
			username: String,
		},
	],
});

module.exports = model('Lesson', lessonSchema);
