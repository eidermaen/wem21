const add = (x,y) => x+y;
const mul = (x,y) =>x*y;

function pubsub() {
	this.subs = [];
	const that = this;
	return {
		subscribe(fn) {
			that.subs.push(fn);
		},
		publish(value) {
			that.subs.forEach(fn => {
				fn(value);
			});
		}
	}
}

// const my_pubsub = pubsub();
// my_pubsub.subscribe(console.log);
// my_pubsub.subscribe(console.error);
// my_pubsub.publish('It works!');


function gensymf(symbol) {
	this.symbol = symbol;
	this.counter = 0;

	return () => {
		const output = `${this.symbol}${this.counter}`;
		this.counter++;
		return output;
	}
}

// const gensym = gensymf('G');
// console.log(gensym());
// console.log(gensym());
// console.log(gensym());

function fibonacci(first, second) {
	this.first = first;
	this.second = second;
	this.firstReturned = false;
	this.secondReturned = false;

	return () => {
		if (!this.firstReturned) {
			this.firstReturned = true;
			return this.first;
		} else if (!this.secondReturned) {
			this.secondReturned = true;
			return this.second;
		} else {
			const result = this.first + this.second;
			this.first = this.second;
			this.second = result;
			return result;
		}
	}
}

// const fib = fibonacci(0,1);
// console.log(fib());
// console.log(fib());


function addg(value) {
	function fn(next) {
		if (!next) return value;

		value += next;
		return fn;
	}

	return fn;
}

// console.log(addg(1)(2)(3)());


function applyg(fn) {
	let store = 0;
	return function (first) {
		store = first;
		function cb(second) {
			if (second) {
				store = fn(store, second);
				return cb;
			} else {
				return store;
			}
		}
		return cb;
	}
}

// console.log(applyg((x, y) => x * y)(1)(2)(3)(4)());


function m(value, source) {
	return {
		value,
		source: source || String(value)
	};
}

// console.log(JSON.stringify(m(Math.PI, 'pi')));

function addm(first, second) {
	return {
		value: first.value + second.value,
		source: `(${first.value}+${second.value})`
	};
}

// console.log(JSON.stringify(addm(m(1), m(2))));


function binarymf(fn, sign) {
	return (first, second) => {
		return {
			value: fn(first.value, second.value),
			source: `(${first.value}${sign}${second.value})`
		}
	}
}


function binarymf2(fn, sign) {
	return (first, second) => {
		let firstRaw, secondRaw;
		if (typeof first === 'object' && first.hasOwnProperty('value')) {
			firstRaw = first.value;
		} else {
			firstRaw = first;
		}

		if (typeof second === 'object' && second.hasOwnProperty('value')) {
			secondRaw = second.value;
		} else {
			secondRaw = second;
		}

		return {
			value: fn(firstRaw, secondRaw),
			source: `(${firstRaw}${sign}${secondRaw})`
		}
	}
}

// const addMethod = binarymf((x,y) => x+y, '+');
// console.log(JSON.stringify(addMethod(m(3),m(4))));


function unarymf(fn, sign) {
	return (value) => {
		return {
			value: fn(value),
			source: `(${sign} ${value})`
		}
	}
}

// console.log(JSON.stringify(unarymf(x => x*x, 'square')(4)));


function hyp(a, b) {
	return Math.sqrt(a*a + b*b);
}

// console.log(hyp(3,4));


function exp(array) {
	const fn = array[0];
	const first = array[1];
	const second = array[2];

	let firstRaw, secondRaw;

	if (typeof first === 'number') {
		firstRaw = first;
	} else if (typeof first === 'object' && first.length) {
		firstRaw = exp(first);
	}

	if (second) {
		if (typeof second === 'number') {
			secondRaw = second;
		} else if (typeof second === 'object' && second.length) {
			secondRaw = exp(second);
		}
	}

	if (secondRaw) {
		return fn(firstRaw, secondRaw);
	} else {
		return fn(firstRaw);
	}
}

// const hypa = [ Math.sqrt, [ add, [mul, 3, 3], [mul, 4, 4] ] ];
// console.log(exp(hypa));


var variable;
function store(value) {
	variable = value;
}

function quatre(bin, first, second, cb) {
	cb(bin(first, second));
}

function unaryc(fn) {
	return function(value, cb) {
		cb(fn(value));
	}
}

function binaryc(binary) {
	return function (first, second, cb) {
		cb(binary(first, second));
	}
}

// const sqrtc = binaryc((x,y) => x+y);
// sqrtc(5,6, store);
// console.log(variable)
