const isPrime = number => {
	let prime = true;

	for (let i = 2; i < number - 1; i++) {
		if (number % i == 0) {
			prime = false;
			break;
		}
	}

	return prime;
}

const resultDiv = document.querySelector('#result');
const singleButton = document.querySelector('#js');
const multiButton = document.querySelector('#multi');

const startExecution = () => {
	let primes = 0;

	const start = Date.now();
	for (let i = 1; i < 100_001; i++) {
		if (isPrime(i)) {
			primes++;
		}
	}
	const end = Date.now();

	return {
		primes,
		time: end - start
	}
}

singleButton.onclick = () => {
	const {primes, time} = startExecution();

	resultDiv.innerHTML = `
	<div>There are <strong>${primes}</strong> primes.</div>
	<div>Calculation took ${time} ms for JS.</div>
`;
};

multiButton.onclick = () => {
	const times = [];
	let highest = 0;
	let lowest = Number.POSITIVE_INFINITY;
	let totalPrimes = 0;

	for (let i = 0; i < 10; i++) {
		console.log('i', i);
		const {time, primes} = startExecution();
		totalPrimes = primes;
		times.push(time);

		if (time > highest) {
			highest = time;
		}
		if (time < lowest) {
			lowest = time;
		}
	}

	const average = times.reduce((prev, current) => {
		return prev + current;
	}, 0) / times.length;

	resultDiv.innerHTML = `
		<div>The prime calculation ran 10 times. There are <strong>${totalPrimes}</strong> primes.</div>
		<div>Calculation average: ${average} ms.</div>
		<div>Slowest calculation: ${highest} ms.</div>
		<div>Fastest calculation: ${lowest} ms.</div>
	`;

}
