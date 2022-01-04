const User = require('../models/User');
const Lesson = require('../models/Lesson');

exports.updateUser = async function (userId, lessonId, event) {
	// event can be "register", "create" or "delete", and will define if we're adding or deleting from properties, and if it will be to the property "classes", in case of a teacher, or "signedup_to" in case of a student;

	try {
		// fetch lesson
		const lesson = await Lesson.findById(lessonId);

		// if we're deleting a class we need to updated user's (students) signedup_to and (teachers) classes
		if (event === 'delete') {
			// UPDATING STUDENTS:
			// get list of students
			const students = [...lesson.students];
			for (let student of students) {
				// fetch user from student's id
				const user = await User.findById(student.id);
				// create an array of lessons that don't match the id of the lesson to be deleted
				const filteredSignedup = [];
				student.signedup_to.forEach((registration) => {
					if (registration.id !== lesson._id) {
						filteredSignedup.push(registration);
					}
				});
				// update user's "signedup_to" property
				await User.updateOne(
					{ _id: user._id },
					{ signedup_to: updatedSignedup }
				);
			}

			// UPDATING TEACHERS:
			// get list of teachers
			const teachers = [...lesson.teachers];
			for (let teacher of teachers) {
				// fetch user from teacher's id
				const user = await User.findById(teacher.id);
				// creates a new array of lessons that don't match the id of the lesson to be deleted
				const filteredClasses = [];
				teacher.classes.forEach((classe) => {
					if (classe.id !== lesson._id) {
						filteredClasses.push(classe);
					}
				});
				//update user's "classes" property
				await User.updateOne({ _id: user._id }, { classes: updatedClasses });
			}
			return 'Users updated';
		}

		// fetch user
		const user = await User.findById(userId);

		// if we're creating a class we need to update the user's "classes" property
		if (event === 'create') {
			const updatedClasses = [
				...user.classes,
				{ id: lesson._id, title: lesson.title, teachers: lesson.teachers },
			];
			return await User.updateOne(
				{ _id: user._id },
				{ classes: updatedClasses }
			);
		}

		// if we're signing up to a class we need to updated the user's "signedup_to" property
		if (event === 'register') {
			const updatedSignedup = [
				...user.signedup_to,
				{ id: lesson._id, title: lesson.title, teachers: lesson.teachers },
			];
			return await User.updateOne(
				{ _id: user._id },
				{ signedup_to: updatedSignedup }
			);
		}
	} catch (err) {
		throw new Error(err);
	}
};
