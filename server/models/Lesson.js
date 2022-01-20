const { model, Schema } = require('mongoose');

const lessonSchema = new Schema({
  title: String,
  description: String,
  location: String,
  date: String,
  created_at: String,
  teachers: [
    {
      id: String,
      username: String,
      first_name: String,
      last_name: String,
    },
  ],
  students: [
    {
      id: String,
      username: String,
      first_name: String,
      last_name: String,
      email: String,
    },
  ],
});

module.exports = model('Lesson', lessonSchema);
