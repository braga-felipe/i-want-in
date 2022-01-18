const { gql } = require('apollo-server');

module.exports = gql`
  type User {
    id: ID!
    first_name: String
    last_name: String
    email: String
    username: String!
    created_at: String!
    classes: [ClassItem]
    signedup_to: [ClassItem]
    token: String!
  }

  type Lesson {
    id: ID!
    title: String!
    description: String!
    location: String!
    time: String!
    date: String!
    created_at: String!
    teachers: [Teacher]
    students: [Student]
    studentCount: Int!
  }

  # types to be used in properties
  type ClassItem {
    id: ID!
    title: String!
    teachers: [Teacher]
  }

  type Student {
    id: ID!
    username: String!
    first_name: String!
    last_name: String!
    email: String!
  }

  type Teacher {
    id: ID!
    username: String!
    first_name: String!
    last_name: String!
  }

  type Query {
    getLessons: [Lesson]
    getLesson(lessonId: ID!): Lesson
    getUsers: [User]
    getUser(userId: ID!): User
  }

  input RegisterInput {
    first_name: String!
    last_name: String!
    email: String!
    username: String!
    password: String!
    confirm_password: String!
  }

  input LoginInput {
    username: String!
    password: String!
  }

  type Mutation {
    register(registerInput: RegisterInput): User!
    login(username: String!, password: String!): User!
    createLesson(
      title: String!
      description: String!
      location: String!
      time: String!
      date: String!
      partner: String
    ): Lesson!
    deleteLesson(lessonId: ID!): String!
    signupToLesson(lessonId: ID!, userId: ID!): String!
    deleteUser(username: String!, password: String!): String!
  }
`;
