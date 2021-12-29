const { gql } = require('apollo-server');

module.exports = gql`
	type User {
		id: ID!
		email: String!
		username: String!
		created_at: String!
		signedup_to: [String]
	}

	type Lesson {
		id: ID!
		title: String!
		description: String!
		location: String!
		time: String!
		created_at: String!
		students: [String]
	}

	type Query {
		getLessons: [Lesson]
		getLesson(lessonId: ID!): Lesson
		getUsers: [User]
		getUser(userId: ID!): User
	}

	input RegisterInput {
		username: String!
		password: String!
		confirmpassword: String!
		email: String!
	}

	input LoginInput {
		username: String!
		password: String!
	}

	type Mutation {
		register(registerInput: RegisterInput): User!
		login(username: String!, password: String!): User
		createLesson(
			title: String!
			description: String!
			location: String!
			time: String!
		): Lesson!
		deleteLesson(lessonId: ID!): String!
		signupToLesson(lessonId: ID!, userId: ID!): String!
	}
`;
