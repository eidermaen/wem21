const form = document.getElementById('form');
const input = document.getElementById('input');
const list = document.getElementById('list');

form.onsubmit = e => {
	e.preventDefault();
	const speakerId = `speaker-${list.children.length}`;
	let seconds = 0, minutes = 0, hours = 0;

	const timer = () => {
		seconds++;

		if (seconds == 60) {
			seconds = 0;
			minutes++;
		}
		if (minutes == 60) {
			minutes = 0;
			hours++;
		}

		const formatted = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
		dateSpan.textContent = formatted;
	};
	let interval;

	const name = input.value;
	const nameSpan = document.createElement('span');
	nameSpan.className = 'span-name';
	nameSpan.textContent = name;

	const dateSpan = document.createElement('span');
	dateSpan.className = 'span-time';
	dateSpan.textContent = '00:00:00';

	const liElement = document.createElement('li');
	liElement.id = speakerId;
	const startButton = document.createElement('button');
	startButton.classList.add('btn', 'btn-start');
	startButton.textContent = 'Start!';
	startButton.onclick = () => {
		list.childNodes.forEach(node => {
			if (node.id !== speakerId) {
				node.querySelector('.btn-stop').click();
			}
		});

		interval = setInterval(timer, 1000);
		startButton.hidden = true;
		stopButton.hidden = false;
	};

	const stopButton = document.createElement('button');
	stopButton.classList.add('btn', 'btn-stop');
	stopButton.textContent = 'Stop!';
	stopButton.hidden = true;
	stopButton.onclick = () => {
		clearInterval(interval);
		startButton.hidden = false;
		stopButton.hidden = true;
	};

	liElement.append(nameSpan, dateSpan, startButton, stopButton);
	list.appendChild(liElement);
	input.value = null;
}
