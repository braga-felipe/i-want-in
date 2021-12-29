const lessonsResolver = require('./lessons');
const usersResolver = require('./users');
module.exports = {
	Query: {
		...usersResolver.Query,
		...lessonsResolver.Query,
	},
	Mutation: {
		...usersResolver.Mutation,
		...lessonsResolver.Mutation,
	},
};
