const Lesson = require('../../models/Lesson');
const checkAuth = require('../../helpers/authorizations');
module.exports = {
	Query: {
		async getLessons() {
			try {
				const lessons = await Lesson.find();
				return lessons;
			} catch (err) {
				console.log(err);
			}
		},

		async getLesson(_, { lessonId }) {
			try {
				const lesson = await Lesson.findById(lessonId);
				if (lesson) return lesson;
				else throw new Error('Lesson not found');
			} catch (err) {
				throw new Error(err);
			}
		},
	},

	Mutation: {
		async createLesson(_, { title, description, location, time }, context) {
			const user = checkAuth(context);
			console.log('user: ', user);
			try {
				const lesson = new Lesson({
					title,
					description,
					location,
					time,
					teacher_name: user.username,
					teacher: user.id,
					created_at: new Date().toISOString(),
				});

				const res = await lesson.save();

				return {
					...res._doc,
					id: res.id,
				};
			} catch (err) {
				console.log(err);
			}
		},

		async deleteLesson(_, { lessonId }) {
			try {
				const lesson = await Lesson.findById(lessonId);

				if (lesson) {
					const lessonTitle = lesson.title;
					await lesson.delete();
					return `Lesson deleted: ${lessonTitle}`;
				} else throw new Error('Lesson not found');
			} catch (err) {
				throw new Error(err);
			}
		},
	},
};
