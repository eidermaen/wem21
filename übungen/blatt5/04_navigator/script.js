const URL = 'https://www2.inf.h-brs.de/~jitter2s/wem/navigator_contents.json';
const topNavBar = document.getElementById('navbar-links');
const leftSidebar = document.getElementById('left-sidebar');
const rightSidebar = document.getElementById('right-sidebar');
const contentDiv = document.getElementById('content');

const pathParams = new URLSearchParams(window.location.search);

const topButtons = [];

const generateButton = (title, index) => {
	const btn = document.createElement('button');
	btn.className = 'btn';
	if (index === 0) {
		btn.classList.add('btn-active');
	}
	btn.innerText = title.toUpperCase();
	return btn;
}

fetch(URL)
	.then(result => result.json())
	.then(data => {
		topNavBar.innerText = '';
		const selectedTop = pathParams.get('top');
		const selectedLeft = pathParams.get('left');

		Object.keys(data).forEach((topKey, topIndex) => {
			const btn = generateButton(topKey, topIndex);
			topButtons.push(btn);
			topNavBar.appendChild(btn);

			const sideBarButtons = [];

			btn.onclick = () => {
				topButtons.forEach(b => b.classList.remove('btn-active'));
				btn.classList.add('btn-active');
				leftSidebar.innerText = '';
				Object.keys(data[topKey]).forEach((leftKey, leftIndex) => {
					const leftBtn = generateButton(leftKey, leftIndex);
					sideBarButtons.push(leftBtn);
					leftSidebar.appendChild(leftBtn);

					leftBtn.onclick = () => {
						sideBarButtons.forEach(b => b.classList.remove('btn-active'));
						leftBtn.classList.add('btn-active');
						const content = data[topKey][leftKey].content;
						contentDiv.innerText = content;
					}

					if (selectedTop && selectedLeft) {
						if (leftIndex === selectedLeft) {
							leftBtn.click();
						}
					} else if (leftIndex === 0) {
						leftBtn.click();
					}
				});
			}

			if (selectedTop) {
				if (topIndex === selectedTop) {
					btn.click();
				}
			} else if (topIndex === 0) {
				btn.click();
			}
		});
	});
