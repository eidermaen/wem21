const response = await fetch('ggt.wasm');
const buffer = await response.arrayBuffer();
const wasm = await WebAssembly.instantiate(buffer);
const ggT = wasm.instance.exports.ggT;

const tbody = document.querySelector('#table > tbody');

const getRandomNumber = () => {
	return Math.floor(Math.random() * 100)
}

for (let i=0; i < 50; i++) {
	const first = getRandomNumber();
	const second = getRandomNumber();
	const result = ggT(first, second);

	const tr = document.createElement('tr');
	tr.innerHTML = `
		<td>${first}</td>
		<td>${second}</td>
		<td>${result}</td>
	`;

	tbody.appendChild(tr);
}
