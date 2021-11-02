const form = document.getElementById('form');
const input = document.getElementById('input');
const list = document.getElementById('list');

form.onsubmit = (e) => {
	e.preventDefault();
	const textContent = input.value;
	const liElement = document.createElement('li');
	const spanElement = document.createElement('span');
	spanElement.innerText = textContent;

	const deleteButton = document.createElement('button');
	deleteButton.textContent = 'Delete';
	deleteButton.className = 'btn-delete';
	deleteButton.onclick = e => {
		list.removeChild(liElement)
	}

	liElement.append(spanElement, deleteButton);

	list.appendChild(liElement);
	input.value = null;
}
