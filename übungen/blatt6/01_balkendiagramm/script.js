const svg = document.getElementById('svg');
const SVG_NS = 'http://www.w3.org/2000/svg';

fetch('./data.json')
	.then(r => r.json())
	.then(data => doTheRest(data))
	.catch(e => alert('Could not load data: ' + e));

function doTheRest(data) {
	const textGroup = document.createElementNS(SVG_NS, 'g');
	const barGroup = document.createElementNS(SVG_NS, 'g');

	data.forEach((d, index) => {
		const y = (index + 1) * 40;
		textGroup.appendChild(createLegendTextItem(d.name, y));

		barGroup.appendChild(createSvgBar(d, y));

	});
	svg.append(textGroup, barGroup);
}

function createSvgBar(data, y) {
	const bar = document.createElementNS(SVG_NS, 'rect');
	const height = 10;
	setAttribute(bar, 'fill', data.color);
	setAttribute(bar, 'width', data.seats);
	setAttribute(bar, 'height', height);
	setAttribute(bar, 'x', '200');
	setAttribute(bar, 'y', y - height);
	bar.classList.add('bar');
	bar.onmouseover = onBarMouseOver;
	bar.onmouseleave = onBarMouseLeave;

	return bar;
}

function createLegendTextItem(label, y) {
	const text = document.createElementNS(SVG_NS, 'text');
	setAttribute(text, 'x', '10');
	setAttribute(text, 'y', y);
	setAttribute(text, 'fill', 'black');
	text.textContent = label;
	return text;
}

function setAttribute(node, attribute, value) {
	node.setAttributeNS(null, attribute, value);
}

function onBarMouseOver(e) {
	const bars = document.querySelectorAll('.bar');
	bars.forEach(b => {
		if (b !== e.target) {
			b.classList.add('bar-inactive');
		}
	})
}

function onBarMouseLeave(e) {
	const bars = document.querySelectorAll('.bar');
	bars.forEach(b => b.classList.remove('bar-inactive'));
}
