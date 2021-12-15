const go = new Go();
const response = await fetch('go/primego.wasm');
const buffer = await response.arrayBuffer();
const wasm = await WebAssembly.instantiate(buffer, go.importObject);


let mod = wasm.module;
let inst = wasm.instance;


async function run() {
	await go.run(inst);
	inst = await WebAssembly.instantiate(mod, go.importObject);
}

const button = document.querySelector('#go');

console.log('button', button);

button.onclick = () => {
	console.log('running go..');
	run();
};
