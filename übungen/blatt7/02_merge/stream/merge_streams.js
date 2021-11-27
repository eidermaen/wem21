import * as fs from 'fs';
import * as stream from 'stream';
import * as util from 'util';

const pipeline = util.promisify(stream.pipeline);

const firstFile = process.argv[2];
const secondFile = process.argv[3];

(async _ => {
	if (!firstFile || !secondFile) {
		console.error('Please provide 2 file names!');
	} else {
		let output = [[],[]];

		console.time('MERGE');

		await pipeline(
			fs.createReadStream(firstFile, 'utf8'),
			async data => {
				for await (const chunk of data) {
					const split = chunk.split('\n');
					output[0].push(...split);
				}
			}
		);

		await pipeline(
			fs.createReadStream(secondFile, 'utf8'),
			async data => {
				for await (const chunk of data) {
					const split = chunk.split('\n');
					output[1].push(...split);
				}
			}
		);

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
})()
