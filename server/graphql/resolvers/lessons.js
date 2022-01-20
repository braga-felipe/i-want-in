const Lesson = require('../../models/Lesson');
const User = require('../../models/User');
const checkAuth = require('../../helpers/authorizations');
const { updateUser } = require('../../helpers/updateLogic');
const { validateCreateInput } = require('../../helpers/validators');
// UserInputError from Apollo
const { UserInputError } = require('apollo-server');

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
      { title, description, location, date, partner },
      context
    ) {
      // Validate user
      const userValid = checkAuth(context);
      const user = await User.findOne({ _id: userValid.id });
      const _partner = await User.findOne({ username: partner });

      // Validate input
      const { errors, valid } = validateCreateInput(
        title,
        description,
        location,
        date
      );
      if (!valid) {
        throw new UserInputError('Errors', { errors });
      }

      // variable to be stored in "teachers" prop of Lesson, if partner is set it will be pushed to the variable teachers.
      const teachers = [
        {
          id: user.id,
          username: user.username,
          first_name: user.first_name,
          last_name: user.last_name,
        },
      ];
      _partner &&
        teachers.push({
          id: _partner._id,
          username: _partner.username,
          first_name: _partner.first_name,
          last_name: _partner.last_name,
        });
      console.log({ teachers });
      try {
        // create new instance of Lesson with params
        const lesson = new Lesson({
          title,
          description,
          location,
          date,
          teachers,
          created_at: new Date().toISOString(),
        });

        // save instance to database
        const res = await lesson.save();

        // updating teachers property:
        // in case there's a partner passed in the arguments, update "classes" property
        _partner && updateUser(res._id, 'create', _partner._id);

        // update User's "classes" property
        updateUser(res._id, 'create', user.id);

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
        console.log({ lesson });
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
