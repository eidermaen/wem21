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
let primes = 0;

const start = Date.now();
for (let i = 1; i < 100_001; i++) {
	if (isPrime(i)) {
		primes++;
	}
}
const end = Date.now();

resultDiv.innerHTML = `
	<div>There are <strong>${primes}</strong> primes.</div>
	<div>Calculation took ${end - start} ms for JS.</div>
`;
