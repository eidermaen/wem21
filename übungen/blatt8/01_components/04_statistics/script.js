import {LitElement, html, css} from 'https://unpkg.com/lit-element@3.0.2/lit-element.js?module';

class DiagramElement extends LitElement {

	constructor () {
		super();
		this.svg = null;
		this.SVG_NS = 'http://www.w3.org/2000/svg';

		fetch('./data.json')
			.then(r => r.json())
			.then(data => this._doTheRest(data))
			.catch(e => alert('Could not load data: ' + e));
	}

	static styles = css`
		.bar {
            transition: all 600ms;
            cursor: pointer;
        }

        .bar-inactive {
            fill: lightgray;
        }
	`

	render() {
		return html`
            <svg id="svg" width="500" height="500" viewBox="0 0 500 500" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="500" height="500" fill="white"/>
            </svg>
		`
	}

	_doTheRest(data) {
		this.svg = this.renderRoot.getElementById('svg');
		const textGroup = document.createElementNS(this.SVG_NS, 'g');
		const barGroup = document.createElementNS(this.SVG_NS, 'g');

		data.forEach((d, index) => {
			const y = (index + 1) * 40;
			textGroup.appendChild(this._createLegendTextItem(d.name, y));

			barGroup.appendChild(this._createSvgBar(d, y));

		});
		this.svg.append(textGroup, barGroup);
	}

	_createSvgBar = (data, y) => {
		const bar = document.createElementNS(this.SVG_NS, 'rect');
		const height = 10;
		this._setAttribute(bar, 'fill', data.color);
		this._setAttribute(bar, 'width', data.seats);
		this._setAttribute(bar, 'height', height);
		this._setAttribute(bar, 'x', '200');
		this._setAttribute(bar, 'y', y - height);
		bar.classList.add('bar');
		bar.onmouseover = this._onBarMouseOver;
		bar.onmouseleave = this._onBarMouseLeave;

		return bar;
	}

	_createLegendTextItem = (label, y) => {
		const text = document.createElementNS(this.SVG_NS, 'text');
		this._setAttribute(text, 'x', '10');
		this._setAttribute(text, 'y', y);
		this._setAttribute(text, 'fill', 'black');
		text.textContent = label;
		return text;
	}

	_setAttribute(node, attribute, value) {
		node.setAttributeNS(null, attribute, value);
	}

	_onBarMouseOver = e => {
		const bars = this.renderRoot.querySelectorAll('.bar');
		bars.forEach(b => {
			if (b !== e.target) {
				b.classList.add('bar-inactive');
			}
		})
	}

	_onBarMouseLeave = e => {
		const bars = this.renderRoot.querySelectorAll('.bar');
		bars.forEach(b => b.classList.remove('bar-inactive'));
	}
}

customElements.define('bar-chart', DiagramElement);
