const Lesson = require('../../models/Lesson');
const User = require('../../models/User');
const checkAuth = require('../../helpers/authorizations');
const { updateUser } = require('../../helpers/updateLogic');

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
		async createLesson(
			_,
			{ title, description, location, time, partner },
			context
		) {
			// Validate user
			const user = checkAuth(context);
			const _partner = await User.findOne({ username: partner });

			// variable to be stored in teachers prop of Lesson, if partner is set it will be pushed to the variable teachers.
			const teachers = [{ id: user.id, username: user.username }];
			_partner &&
				teachers.push({ id: _partner._id, username: _partner.username });

			try {
				// create new instance of Lesson with params
				const lesson = new Lesson({
					title,
					description,
					location,
					time,
					created_at: new Date().toISOString(),
					teachers,
				});

				// save instance to database
				const res = await lesson.save();

				// updating teachers property:
				// create variable storing information from user
				const teachersUpdate = [{ id: user.id, username: user.username }];
				// in case there's a partner passed in the arguments, push the info of the partner
				if (_partner) {
					teachersUpdate.push({ id: _partner.id, username: _partner.username });
					console.log({ teachersUpdate });
					_partner.classes.push({ id: lesson._id, title: lesson.title });
					await User.updateOne(
						{ _id: _partner.id },
						{ classes: _partner.classes }
					);
				}
				// update teachers property with info gathered
				await Lesson.updateOne({ _id: res._id }, { teachers: teachersUpdate });

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
					teachers: res.teachers,
				};
			} catch (err) {
				console.log(err);
			}
		},

		async deleteLesson(_, { lessonId }) {
			try {
				const lesson = await Lesson.findById(lessonId);
				if (lesson) {
					await updateUser(lessonId, 'delete');
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
