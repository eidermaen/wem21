const progressBar = document.getElementById('bar');
const primes = document.getElementById('primes');

setInterval(() => {
	const direction = progressBar.dataset.direction;
	const currentValue = progressBar.value;
	let newValue;
	switch (direction) {
		case 'up': {
			if (currentValue < 100) {
				newValue = currentValue + 1;
			} else {
				newValue = 99;
				progressBar.dataset.direction = 'down';
			}
			break;
		}
		case 'down': {
			if (currentValue > 0) {
				newValue = currentValue - 1;
			} else {
				newValue = 1;
				progressBar.dataset.direction = 'up';
			}
			break;
		}
	}
	progressBar.value = newValue;
}, 0);

let initialValue = BigInt(3_000_000);

setInterval(() => {
	let isPrime = true;
	for (let i = BigInt(2); i < initialValue; i++) {
		if (initialValue % i == 0) {
			isPrime = false;
			break;
		}
	}
	if (isPrime) {
		const div = document.createElement('div');
		div.innerText = initialValue;
		primes.prepend(div);
	}
	initialValue++;
}, 0);
