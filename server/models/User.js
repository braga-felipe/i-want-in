const { model, Schema } = require('mongoose');

const userSchema = new Schema({
  first_name: String,
  last_name: String,
  email: String,
  username: String,
  password: String,
  created_at: Date,
  classes: [
    {
      id: String,
      title: String,
      date: String,
      location: String,
      teachers: [
        {
          id: String,
          username: String,
          first_name: String,
          last_name: String,
        },
      ],
    },
  ],
  signedup_to: [
    {
      id: String,
      title: String,
      date: String,
      location: String,
      teachers: [
        {
          id: String,
          username: String,
          first_name: String,
          last_name: String,
        },
      ],
    },
  ],
});

module.exports = model('User', userSchema);
