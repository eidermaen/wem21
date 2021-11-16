const div = document.getElementById('body');
const timeDiv = document.getElementById('time');
const URL = 'https://www2.inf.h-brs.de/~jitter2s/wem'; //'/wem/übungen/blatt5/01_promises';

const start = Date.now();

let result = [];
(async _ => {
	try {
		const fileOne = async () => {
			const response = await fetch(`${URL}/A.txt`);
			const data = await response.text();
			return data.split('\n');
		};

		const fileTwo = async () => {
			const response = await fetch(`${URL}/B.txt`);
			const data = await response.text();
			return data.split('\n');
		};

		const result = [];
		const responses = await Promise.all(fileOne, fileTwo);

		for (let i = 0; i < responses[1].length; i++) {
			result[i] += responses[1][i];
		}

		const end = Date.now();
		div.innerHTML = result.join('<br>');
		timeDiv.textContent = `Fetch time: ${(end - start) / 1000}s`;

	} catch (e) {
		console.error(e);
	}
})()
