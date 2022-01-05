const teachers = [];
const check = true;

check && teachers.push('New teacher');

teachers.push('Another teacher');
teachers;

const arrObj = [
	{ id: 12345, name: 'João' },
	{ id: 23456, name: 'Maria' },
	{ id: 3456, name: 'José' },
];

const filtered = [];

arrObj.forEach((obj) => {
	if (obj.id !== arrObj[2].id) {
		filtered.push(obj);
	}
});

filtered;

const id = '61d489a4cf1b7ecf86a6af19';
