const lessonsResolver = require('./lessons');
const usersResolver = require('./users');
module.exports = {
	Lesson: {
		studentCount: (parent) => parent.students.length,
	},
	Query: {
		...usersResolver.Query,
		...lessonsResolver.Query,
	},
	Mutation: {
		...usersResolver.Mutation,
		...lessonsResolver.Mutation,
	},
};
