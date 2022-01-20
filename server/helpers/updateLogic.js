const User = require('../models/User');
const Lesson = require('../models/Lesson');

const updateUser = async function (lessonId, event, userId = null) {
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
        user.signedup_to.forEach((registration) => {
          if (registration.title !== lesson.title) {
            filteredSignedup.push(registration);
          }
        });
        // update user's "signedup_to" property
        await User.updateOne(
          { _id: user._id },
          { signedup_to: filteredSignedup }
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
        user.classes.forEach((classe) => {
          const id = classe.id;
          const _id = lesson.id;
          if (id !== _id) {
            filteredClasses.push(classe);
          }
        });
        //update user's "classes" property
        await User.updateOne({ _id: user._id }, { classes: filteredClasses });
      }
      return 'Users updated';
    }

    // fetch user
    const user = await User.findById(userId);
    console.log('user in UPDATE', user);
    // if we're creating a class we need to update the user's "classes" property
    if (event === 'create') {
      const updatedClasses = [
        ...user.classes,
        {
          id: lesson._id,
          title: lesson.title,
          date: lesson.date,
          location: lesson.location,
          teachers: lesson.teachers,
        },
      ];
      return await User.updateOne(
        { _id: user._id },
        { classes: updatedClasses }
      );
    }

    // if we're signing up to a class we need to updated the user's "signedup_to" property
    if (event === 'register') {
      const updatedStudents = [
        ...lesson.students,
        {
          id: user._id,
          username: user.username,
          first_name: user.first_name,
          last_name: user.last_name,
          email: user.email,
        },
      ];

      await Lesson.updateOne(
        { _id: lesson._id },
        { students: updatedStudents }
      );

      const updatedSignedup = [
        ...user.signedup_to,
        {
          id: lesson._id,
          title: lesson.title,
          date: lesson.date,
          location: lesson.location,
          teachers: lesson.teachers,
        },
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

module.exports = { updateUser };
