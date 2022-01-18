// to create token
const jwt = require('jsonwebtoken');
const { SECRET_KEY } = require('../../config');

exports.generateToken = (user) => {
  return jwt.sign(
    {
      id: user.id,
      email: user.email,
      username: user.username,
    },
    SECRET_KEY,
    { expiresIn: '1h' }
  );
};

exports.validateRegistrationInput = (
  first_name,
  last_name,
  email,
  username,
  password,
  confirmpassword
) => {
  // object to store the errors and to later check if the errors object is empty
  const errors = {};

  // check if first_name input is empty
  if (first_name.trim() === '')
    errors.first_name = 'Please enter your first name';

  // check if last_name input is empty
  if (last_name.trim() === '') errors.last_name = 'Please enter your last name';

  // check if username is empty
  if (username.trim() === '') errors.username = 'Please enter a valid username';

  // check if email is empty and if it's not a valid email
  if (email.trim() === '') errors.email = 'Please enter a valid email';
  else {
    // regEx to check formatting of email
    const regEx =
      /^([0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-\w]*[0-9a-zA-Z]\.)+[a-zA-Z]{2,9})$/;
    if (!email.match(regEx))
      errors.email = 'Please enter a valid email address';
  }

  // check if password is empty and if it matches the confirmpassword
  if (password.trim() === '') errors.password = 'Please enter a password';
  else if (password !== confirmpassword)
    errors.password = 'Passwords do not match';

  return {
    errors,
    valid: !Object.keys(errors).length,
  };
};

exports.validateLoginInput = (username, password) => {
  // object to store the errors and to later check if the errors object is empty
  const errors = {};

  // check if username is empty
  if (username.trim() === '') errors.username = 'Please enter a username';

  // check if password is empty
  if (password.trim() === '') errors.password = 'Please enter a password';

  return {
    errors,
    valid: !Object.keys(errors).length,
  };
};

exports.validateCreateInput = (title, description, location, time, date) => {
  // object to store the errors and to later check if the errors object is empty
  const errors = {};

  // check if title input is empty
  if (title.trim() === '') errors.title = 'Please enter a title';

  // check if description input is empty
  if (description.trim() === '')
    errors.description = 'Please enter a description';

  // check if location input is empty
  if (location.trim() === '') errors.location = 'Please enter a location';

  // check if time input is empty
  if (time.trim() === '') errors.time = 'Please select time';

  // check if date input is empty
  if (date.trim() === '') errors.time = 'Please select date';

  return {
    errors,
    valid: !Object.keys(errors).length,
  };
};

// old phone number validation
// // check if phone input is empty
// if (phone.trim() === '') errors.phone = 'Please enter a phone number';
// else {
// 	// regEx to validate phone number
// 	const regEx = /^(\+|00)[1-9][0-9 \-\(\)\.]{7,32}$/;
// 	if (!phone.match(regEx)) {
// 		errors.phone = 'Please enter a valid phone number';
// 	}
// }
