import {LitElement, html, css} from 'https://unpkg.com/lit-element@3.0.2/lit-element.js?module';

class BezierElement extends LitElement {

	constructor () {
		super();
	}

	static styles = css`
		.draggable {
        	cursor: move;
		}
	
		path {
			fill: none;
			stroke: black;
			stroke-width: 1;
		}
	`

	render () {
		return html`
            <svg id="svg" width="1000" height="600">
                <circle class="draggable" cx="100" cy="100" r="5" style="fill: black"></circle>
                <circle class="draggable" cx="200" cy="100" r="5" style="fill: red"></circle>
                <circle class="draggable" cx="100" cy="200" r="5" style="fill: blue"></circle>
                <circle class="draggable" cx="200" cy="200" r="5" style="fill: green"></circle>
                <g id="bezier"></g>
            </svg>
		`
	}

	firstUpdated() {
		super.firstUpdated();

		const svg = this.renderRoot.querySelector('#svg');

		svg.onmousedown = startDrag;
		svg.onmousemove = drag;
		svg.onmouseup = endDrag;
		svg.onmouseleave = endDrag;

		let selectedElement = null;
		let offset = null;
		const bezier = this.renderRoot.getElementById('bezier');
		const circles = svg.querySelectorAll('.draggable');
		const paths = createPaths(circles);
		bezier.innerHTML = paths;

		function startDrag (e) {
			if (e.target.classList.contains('draggable')) {
				selectedElement = e.target;
				offset = getMousePosition(e);
				offset.x -= parseFloat(selectedElement.getAttribute('cx'));
				offset.y -= parseFloat(selectedElement.getAttribute('cy'));
			}
		}

		function drag (e) {
			if (selectedElement) {
				e.preventDefault();
				const coord = getMousePosition(e);
				selectedElement.setAttribute('cx', coord.x - offset.x);
				selectedElement.setAttribute('cy', coord.y - offset.y);
				bezier.innerHTML = createPaths(circles);
			}
		}

		function endDrag () {
			selectedElement = null;
		}

		function getMousePosition (e) {
			const CTM = svg.getScreenCTM();
			return {
				x: (e.clientX - CTM.e) / CTM.a,
				y: (e.clientY - CTM.f) / CTM.d
			};
		}

		function createPaths (circles) {
			return `<path d="M${circles[0].getAttribute("cx")},${circles[0].getAttribute("cy")} C${circles[1].getAttribute("cx")},${circles[1].getAttribute("cy")} ${circles[3].getAttribute("cx")},${circles[3].getAttribute("cy")} ${circles[2].getAttribute("cx")},${circles[2].getAttribute("cy")}"></path>
        <path d="M${circles[0].getAttribute("cx")},${circles[0].getAttribute("cy")} L${circles[1].getAttribute("cx")},${circles[1].getAttribute("cy")}"></path>
        <path d="M${circles[1].getAttribute("cx")},${circles[1].getAttribute("cy")} L${circles[3].getAttribute("cx")},${circles[3].getAttribute("cy")}"></path>
        <path d="M${circles[3].getAttribute("cx")},${circles[3].getAttribute("cy")} L${circles[2].getAttribute("cx")},${circles[2].getAttribute("cy")}"></path>`;
		}
	}
}

customElements.define('bezier-animation', BezierElement);
