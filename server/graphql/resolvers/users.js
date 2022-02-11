// to encrypt the password
const bcrypt = require('bcryptjs');

// UserInputError from Apollo
const { UserInputError } = require('apollo-server');

// helper functions
const {
  generateToken,
  validateRegistrationInput,
  validateLoginInput,
} = require('../../helpers/validators');

// models
const User = require('../../models/User');
const Lesson = require('../../models/Lesson');
const { updateUser } = require('../../helpers/updateLogic');

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
          email,
          username,
          password,
          confirm_password,
        },
      }
    ) {
      // Validate user data
      // destructure the result of calling the helper
      const { valid, errors } = validateRegistrationInput(
        first_name,
        last_name,
        email,
        username,
        password,
        confirm_password
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
        ...res._doc,
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
      const lesson = await Lesson.findById(lessonId);
      try {
        const student = await User.findById(userId);
        if (student) {
          // check if student is already registered
          if (
            student.signedup_to.filter((lesson) => lesson.id === lessonId)
              .length
          ) {
            return 'You are already registred to this class.';
          }

          // update user and lesson
          await updateUser(lessonId, 'register', userId);

          // get teacher(s) name(s)
          const teachers = lesson.teachers
            .flatMap((teacher) => teacher.username)
            .join(' and ');

          return `${student.first_name} registered successfully to ${lesson.title} with ${teachers} !`;
        }
        return 'User not found';
      } catch (err) {
        throw new Error(err);
      }
    },
  },
};
