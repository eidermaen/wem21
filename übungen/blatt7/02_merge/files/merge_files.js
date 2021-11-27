import * as fs from 'fs';
import * as util from 'util';

const readFile = util.promisify(fs.readFile);

const firstFile = process.argv[2];
const secondFile = process.argv[3];


(async _ => {
	if (!firstFile || !secondFile) {
		console.error('Please provide 2 file names!');
	} else {
		let output = [[],[]];

		console.time('MERGE');

		const fileOne = await readFile(firstFile, 'utf8');
		const fileTwo = await readFile(secondFile, 'utf8');

		output[0].push(...fileOne.split('\n'));
		output[1].push(...fileTwo.split('\n'));

		const outputFile = 'output.txt';
		let outputString = '';
		const lengthA = output[0].length;
		const lengthB = output[1].length;
		const max = lengthA > lengthB ? lengthA : lengthB;

		for (let i = 0; i < max; i++) {
			let first = output[0][i] || '';
			let second = output[1][i] || '';

			outputString += `${first} ${second} \n`;
		}

		console.timeEnd('MERGE');

		fs.writeFile(outputFile, outputString, err => {
			if (err) {
				console.error(err);
			} else {
				console.log('Files merged! Check "output.txt".')
			}
		});
	}
})();
