import * as fs from 'fs';
const input = process.argv[2];

if (!input) {
	console.error('Please enter a number!');
} else {
	const length = parseInt(input.replace('_', ''));
	let outputString = '';


	for (let i = 0; i < length; i++) {
		const lineContent = getCharacter(i);
		outputString += `${lineContent}\n`;
	}

	fs.writeFile('output.txt', outputString, err => {
		if (err) {
			console.error('Error while trying to create file', err);
		} else {
			console.log('File has been created successfully!');
		}
	});
}


function getCharacter(i) {
	const div = Math.floor(i / 26);
	if (div === 0) {
		return String.fromCharCode((i + 65)).toUpperCase();
	}

	const output = [];
	const rest = i % 26;
	let tmp = getCharacter(div - 1);
	tmp += getCharacter(rest);
	output.push(tmp);

	return output.join('');
}
