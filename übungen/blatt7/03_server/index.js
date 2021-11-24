const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const util = require('util');
const promisify = util.promisify;

const readFile = promisify(fs.readFile);
const writeFile = promisify(fs.writeFile);

const { customAlphabet } = require('nanoid');
const nanoid = customAlphabet('abcdefghijklmnopqrstuvwxyz1234567890', 10);

const upload = multer({
	storage: multer.memoryStorage()
});

const filesUpload = upload.fields([
	{name: 'first', maxCount: 1},
	{name: 'second', maxCount: 1}
]);

app.set('view engine', 'hbs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: true
}));
app.use(express.json());

app.get('/', (req, res) => {
	res.render('index');
});

app.get('/download', (req, res) => {
	const id = req.query.id;

	if (!id) {
		return res.redirect('/');
	}

	res.render('download', { id });

});

app.post('/rest/merge', filesUpload, async (req, res, next) => {
	const file1 = req.files.first[0].buffer.toString();
	const file2 = req.files.second[0].buffer.toString();

	const output = mergeFiles(file1, file2);
	const id = nanoid();

	try {
		await writeFile(`downloads/${id}.txt`, output);
		return res.redirect(`/download?id=${id}`);
	} catch (e) {
		return next(e);
	}

});

app.get('/rest/download/:id', async (req, res, next) => {
	const id = req.params.id;
	if (!id) {
		return res.redirect('/');
	}

	res.download(path.join(__dirname, `downloads/${id}.txt`), 'merge.txt');

	fs.unlink(`downloads/${id}.txt`, () => {});
});

app.use((err, req, res, next) => {
	console.error('Error', err);
});

app.listen(3000, () => {
	console.log('Servers started on port 3000.');
});


function mergeFiles(fileOne, fileTwo) {
	const output = [[],[]];

	output[0].push(...fileOne.split('\n'));
	output[1].push(...fileTwo.split('\n'));

	let outputString = '';
	const lengthA = output[0].length;
	const lengthB = output[1].length;
	const max = lengthA > lengthB ? lengthA : lengthB;

	for (let i = 0; i < max; i++) {
		let first = output[0][i] || '';
		let second = output[1][i] || '';

		outputString += `${first} ${second} \n`;
	}

	return outputString;
}
