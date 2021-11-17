import * as fs from 'fs';

const firstFile = process.argv[2];
const secondFile = process.argv[3];

if (!firstFile || !secondFile) {
	console.error('Please provide 2 file names!');
} else {
	let output = [[],[]];
	const firstStream = fs.createReadStream(firstFile, 'utf8');
	const secondStream = fs.createReadStream(secondFile, 'utf8');

	firstStream.on('data', chunk => {
		output[0].push(chunk);
	});

	secondStream.on('data', chunk => {
		output[1].push(chunk);
	});


}
