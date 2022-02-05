self.onmessage = (e) => {
	const number = e.data;
	let isPrime = true;
	for (let i = BigInt(2); i < number; i++) {
		if (number % i == 0) {
			isPrime = false;
			break;
		}
	}
	postMessage({number, isPrime});
}
