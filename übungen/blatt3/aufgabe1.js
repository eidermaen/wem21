const add = (x,y) => x+y;
const mul = (x,y) => x*y;

function identity_function(param) {
	return function() {
		return param;
	}
}

function addf(x) {
	return function(y) {
		return x + y;
	}
}

function applyf(fn) {
	return function(x) {
		return function(y) {
			return fn(x,y);
		}
	}
}

function curry(fn, first) {
	return function(second) {
		return fn(first, second);
	}
}

function inc(x) {
	return addf(x)(1);
}

function methodize(fn) {
	return function(x) {
		return fn(this, x);
	}
}

// Number.prototype.add = methodize(add);
// console.log((3).add(4));

function demethodize(fn) {
	return function(x,y) {
		return fn.call(x, y);
	}
}

// console.log(demethodize(Number.prototype.add)(5, 6));


function twice(fn) {
	return function(x) {
		return fn(x,x);
	}
}

const double = twice((x,y) => x+y);
const square = twice((x,y) => x*y);


function composeu(first, second) {
	return function(x) {
		return second(first(x));
	}
}

function composeb(first, second) {
	return function(x, y, z) {
		return second(first(x, y), z);
	}
}

function once(fn) {
	this.ran = false;
	const that = this;
	return function(x,y) {
		if (!that.ran) {
			that.ran = true;
			return fn(x,y);
		} else {
			throw new Error("Function already ran!");
		}
	}
}

// const add_once = once(add);
// console.log(add_once(3, 4));
// console.log(add_once(3, 4));


function counterf(value) {
	const counter = { value };
	counter.inc = function() {
		counter.value ++;
		return counter.value;
	}
	counter.dec = function() {
		counter.value --;
		return counter.value;
	}

	return counter;
}

const counter = counterf(10);
// console.log(counter.dec());
// console.log(counter.dec());

function revocable(fn) {
	const state = { fn };
	state.invoke = function(value) {
		if (state.fn) {
			return fn(value);
		} else {
			throw new Error("No function available!");
		}
	}
	state.revoke = function() {
		state.fn = null;
	}
	return state;
}

const temp = revocable(console.log);
// temp.invoke(7);
// temp.revoke();
// temp.invoke(8);

function vector() {
	this.vector = [];
	const object = {};
	const that = this;
	object.append = function(value) {
		that.vector.push(value);
	}
	object.store = function(index, value) {
		that.vector.splice(index, 0, value);
		that.vector.join();
	}
	object.get = function(index) {
		return that.vector[index];
	}
	return object;
}

const my_vector = vector();
// my_vector.append(7);
// my_vector.store(1, 8);
// console.log(my_vector.get(0));
// console.log(my_vector.get(1));
