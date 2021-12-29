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
	username,
	email,
	password,
	confirmpassword
) => {
	// object to store the errors and to later check if the errors object is empty
	const errors = {};

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
	if (username.trim() === '') errors.username = 'Please enter a valid username';

	// check if password is empty
	if (password.trim() === '') errors.password = 'Please enter a password';

	return {
		errors,
		valid: !Object.keys(errors).length,
	};
};
