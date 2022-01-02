const Lesson = require('../../models/Lesson');
const User = require('../../models/User');
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
			// Validate user
			const user = checkAuth(context);

			try {
				// create new instance of Lesson with params
				const lesson = new Lesson({
					title,
					description,
					location,
					time,
					teacher_name: user.username,
					teacherId: user.id,
					created_at: new Date().toISOString(),
				});

				// save instance to database
				const res = await lesson.save();

				// update User's "classes" property to add the new instance os lesson
				const userToUpdate = await User.findById(user.id);
				if (userToUpdate) {
					userToUpdate.classes.push({ id: lesson._id, title: lesson.title });
					await User.updateOne(
						{ _id: userToUpdate._id },
						{ classes: userToUpdate.classes }
					);
				}

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
					const teacher = await User.findById(lesson.teacherId);
					if (teacher) {
						const filteredClasses = teacher.classes.filter(
							(cl) => cl.id === lesson._id
						);
						await User.updateOne(
							{ _id: teacher._id },
							{ classes: filteredClasses }
						);
					}
					await lesson.delete();
					return `Lesson deleted: ${lessonTitle}`;
				} else throw new Error('Lesson not found');
			} catch (err) {
				throw new Error(err);
			}
		},
	},
};
