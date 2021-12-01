const URL = 'https://www2.inf.h-brs.de/~jitter2s/wem/navigator_contents.json';
const topNavBar = document.getElementById('navbar-links');
const leftSidebar = document.getElementById('left-sidebar');
const rightSidebar = document.getElementById('right-sidebar');
const contentDiv = document.getElementById('content');

const topButtons = [];

import { MenuEntry } from '../02_menu/script.js';

const generateButton = (title, index) => {
	const btn = new MenuEntry();
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
						rightSidebar.innerText = '';
						sideBarButtons.forEach(b => b.classList.remove('btn-active'));
						leftBtn.classList.add('btn-active');
						const content = data[topKey][leftKey].content;
						contentDiv.innerText = content;

						data[topKey][leftKey].references.forEach(r => {
							const div = document.createElement('div');
							const a = document.createElement('a');
							a.href = r;
							a.target = '_blank';
							a.innerText = r;
							div.appendChild(a);
							rightSidebar.appendChild(div);
						});
					}

					if (leftIndex === 0) {
						leftBtn.click();
					}
				});
			}

			if (topIndex === 0) {
				btn.click();
			}
		});
	});
