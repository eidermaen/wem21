const div = document.getElementById('body');
const timeDiv = document.getElementById('time');
const URL = 'https://www2.inf.h-brs.de/~jitter2s/wem'; //'/wem/übungen/blatt5/01_promises';

const start = Date.now();

let result = [];
const fileOne = new Promise((resolve) => {
	fetch(`${URL}/A.txt`)
		.then(d => (d.text()))
		.then(d => resolve(d.split('\n')));
});
const fileTwo = new Promise((resolve) => {
	fetch(`${URL}/B.txt`)
		.then(d => d.text())
		.then(d => resolve(d.split('\n')));
});

Promise.all([fileOne, fileTwo])
	.then(responses => {
		result.push(...responses[0]);
		for (let i = 0; i < responses[1].length; i++) {
			result[i] += responses[1][i];
		}

		const end = Date.now();
		div.innerHTML = result.join('<br>');
		timeDiv.textContent = `Fetch time: ${(end - start) / 1000}s`;
	});
