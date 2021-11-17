import * as fs from 'fs';
const input = process.argv[2];

if (!input) {
	console.error('Please enter a number!');
} else {
	const length = parseInt(input.replace('_', ''));
	let outputString = '';

	for (let i = 0; i < length; i++) {
		outputString += `${i}.\n`;
	}

	fs.writeFile('output.txt', outputString, err => {
		if (err) {
			console.error('Error while trying to create file', err);
		} else {
			console.log('File has been created successfully!');
		}
	})
}


