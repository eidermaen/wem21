const URL = 'https://www2.inf.h-brs.de/~jitter2s/wem/navigator_contents.json';
let networkDataReceived = false;

if ('serviceWorker' in navigator) {
	window.addEventListener('load', function () {
		navigator.serviceWorker.register('../worker.js').then(function (registration) {
			// Registration was successful
			console.log('ServiceWorker registration successful with scope: ', registration.scope);
		}, function (err) {
			// registration failed :(
			console.log('ServiceWorker registration failed: ', err);
		});
	});
}

const topNavBar = document.getElementById('navbar-links');
const leftSidebar = document.getElementById('left-sidebar');
const rightSidebar = document.getElementById('right-sidebar');
const contentDiv = document.getElementById('content');

const topButtons = [];

import {MenuEntry} from './component.js';

const generateButton = (title, isActive = false) => {
	const btn = new MenuEntry();
	btn.id = title;
	if (isActive) {
		btn.classList.add('btn-active');
	}
	btn.innerText = title.toUpperCase();
	return btn;
}

const networkUpdate = fetch(URL)
	.then(r => r.json())
	.then(data => {
		networkDataReceived = true;
		setupPage(data);
	});

caches.match(URL)
	.then(r => {
		if (!r) throw new Error('No data cached');
		return r.json();
	})
	.then(data => {
		if (!networkDataReceived) {
			setupPage(data);
		}
	})
	.catch(() => {
		return networkUpdate;
	});

const setupPage = data => {
	topNavBar.innerText = '';

	Object.keys(data).forEach((topKey, topIndex) => {
		const btn = generateButton(topKey, topIndex);
		topButtons.push(btn);
		topNavBar.appendChild(btn);

		btn.onclick = () => {
			setButtonActive(btn);
			updateContent(data, topKey);
		}

		if (topIndex === 0) {
			btn.click();
		}
	});

	window.addEventListener('popstate', event => {
		if (event.state) {
			const {topKey, leftKey} = event.state;
			updateContent(data, topKey, leftKey);
			const topBtn = topNavBar.children[Object.keys(data).indexOf(topKey)];
			setButtonActive(topBtn);
		}
	})
};

function updateContent (data, topKey, leftKeyActive) {
	const sideBarButtons = [];

	leftSidebar.innerText = '';
	Object.keys(data[topKey]).forEach((leftKey, leftIndex) => {
		const leftBtn = generateButton(leftKey, leftKeyActive && (leftKey === leftKeyActive) || leftIndex === 0);
		sideBarButtons.push(leftBtn);
		leftSidebar.appendChild(leftBtn);

		leftBtn.onclick = () => {
			rightSidebar.innerText = '';
			setButtonActive(leftBtn);
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

			history.pushState({
				topKey,
				leftKey
			}, leftKey, '#');
		}

		if (leftIndex === 0) {
			leftBtn.click();
		}
	});
}

function setButtonActive (el) {
	el.parentElement.updateActiveButton(el);
}
