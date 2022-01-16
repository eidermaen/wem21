function arrayWrapper() {
	let array = [];

	return {
		get: index => {
			return array[index];
		},

		set: (index, value) => {
			if (typeof index !== 'number' || !['string', 'number'].includes(typeof value)) {
				return
			}
			array[index] = value;
		},

		append: value => {
			array.push(value);
		}
	}
}

function exploit(array) {
	let data;

	array.set('push', function() {
		data = this;
	});

	array.append();

	console.log(data);
}

const wrappedArray = arrayWrapper();
wrappedArray.append(1);

exploit(wrappedArray);
