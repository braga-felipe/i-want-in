// to encrypt the password
const bcrypt = require('bcryptjs');

// UserInputError from Apollo
const { UserInputError } = require('apollo-server');

const {
	generateToken,
	validateRegistrationInput,
	validateLoginInput,
} = require('../../helpers/validators');
const checkAuth = require('../../helpers/authorizations');

const User = require('../../models/User');
const Lesson = require('../../models/Lesson');

module.exports = {
	Query: {
		async getUsers() {
			try {
				const users = await User.find();
				return users;
			} catch (err) {
				throw new Error(err);
			}
		},

		async getUser(_, { userId }) {
			try {
				const user = await User.findById(userId);
				if (user) return user;
				else throw new Error('User not found');
			} catch (err) {
				throw new Error(err);
			}
		},
	},

	Mutation: {
		async login(_, { username, password }) {
			const { errors, valid } = validateLoginInput(username, password);

			if (!valid) {
				throw new UserInputError('Errors', { errors });
			}

			const user = await User.findOne({ username });

			if (!user) {
				errors.general = 'User not found';
				throw new UserInputError('User not found', { errors });
			}

			const match = await bcrypt.compare(password, user.password);
			if (!match) {
				errors.general = 'Wrong crendetials';
				throw new UserInputError('Wrong crendetials', { errors });
			}

			const token = generateToken(user);
			return {
				...user._doc,
				id: user._id,
				token,
			};
		},

		async register(
			_,
			{
				registerInput: {
					first_name,
					last_name,
					phone,
					email,
					username,
					password,
					confirmpassword,
				},
			}
		) {
			// Validate user data
			// destructure the result of calling the helper
			const { valid, errors } = validateRegistrationInput(
				first_name,
				last_name,
				phone,
				email,
				username,
				password,
				confirmpassword
			);
			if (!valid) throw new UserInputError('Errors', { errors });

			// Make sure user doesn't already exist
			const user = await User.findOne({ username });
			if (user) {
				throw new UserInputError('Username already taken', {
					errors: {
						username: 'This username is already taken',
					},
				});
			}

			// hash password
			password = await bcrypt.hash(password, 12);

			//create new instance of User
			const newUser = new User({
				first_name,
				last_name,
				phone,
				email,
				username,
				password,
				created_at: new Date().toISOString(),
			});

			// save new isntance to the database
			const res = await newUser.save();

			// create an auth token
			const token = generateToken(res);

			return {
				// _doc is where the document is stored
				...res._doc,
				// id is not included in the _doc
				id: res._id,
				token,
			};
		},

		async deleteUser(_, { username, password }) {
			const { errors, valid } = validateLoginInput(username, password);

			if (!valid) {
				throw new UserInputError('Errors', { errors });
			}

			const user = await User.findOne({ username });

			if (!user) {
				errors.general = 'User not found';
				throw new UserInputError('User not found', { errors });
			}

			const match = await bcrypt.compare(password, user.password);
			if (!match) {
				errors.general = 'Wrong crendetials';
				throw new UserInputError('Wrong crendetials', { errors });
			}

			// check if user is registered to any classes
			if (user.signedup_to.length) {
				// for every registred class
				for (reg of user.signedup_to) {
					// find that class using the id
					const lesson = await Lesson.findById(reg.id);
					// filter the list of students
					const updatedStudents = lesson.students.filter((student) => {
						return !(student.username === user.username);
					});
					// update the students list
					await Lesson.updateOne(
						{ _id: lesson._id },
						{ students: updatedStudents }
					);
				}
			}

			await user.delete();

			return `User ${user.username} deleted!`;
		},

		async signupToLesson(_, { lessonId, userId }, context) {
			const user = checkAuth(context);
			try {
				const lesson = await Lesson.findById(lessonId);
				if (lesson) {
					const updatedStudents = [
						...lesson.students,
						{ id: user.id, username: user.username },
					];
					await Lesson.updateOne(
						{ _id: lesson._id },
						{ students: updatedStudents }
					);
				}

				const student = await User.findById(userId);
				if (student) {
					const signUps = [
						...student.signedup_to,
						{
							id: lesson._id,
							title: lesson.title,
							teacher: lesson.teacher_name,
						},
					];
					await User.updateOne({ _id: student._id }, { signedup_to: signUps });
				}
				return `${student.username} registered successfully to ${lesson.title} with ${lesson.teacher_name} !`;
			} catch (err) {
				throw new Error(err);
			}
		},
	},
};
