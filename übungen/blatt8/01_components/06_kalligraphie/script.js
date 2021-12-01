import {LitElement, html, css} from 'https://unpkg.com/lit-element@3.0.2/lit-element.js?module';

class KalliElement extends LitElement {
	constructor () {
		super();
	}

	static styles = css`
		.heading {
            padding: 2rem;
            border-radius: .3rem;
            background-color: white;
        }

        .outer {
            position: absolute;
            width: 90vw;
            margin: 2rem;
            height: 80vh;
        }

        #editor {
            position: relative;
            background-color: white;
            padding: 2rem;
            width: 100%;
            height: 80%;
            cursor: cell;
        }

        path {
            fill: none;
            stroke: black;
            stroke-width: 2;
        }
	`

	render() {
		return html`
            <div class="outer">
                <svg id="editor">
                </svg>
            </div>
		`
	}

	firstUpdated() {
		super.firstUpdated();

		const editor = this.renderRoot.getElementById('editor');
		const SVG_NS = 'http://www.w3.org/2000/svg';

		let startDragPosition = null;
		editor.onmousedown = onStartPaint;
		editor.onmousemove = paint;
		editor.onmouseup = onStopPaint;


		function onStartPaint(e) {
			startDragPosition = getMousePosition(e);
		}

		function paint(e) {
			if (startDragPosition) {
				const newMousePosition = getMousePosition(e);
				editor.appendChild(drawPath(startDragPosition, newMousePosition));
				startDragPosition = newMousePosition;
			}
		}

		function onStopPaint() {
			startDragPosition = null;
		}

		function getMousePosition(e) {
			const CTM = editor.getScreenCTM();
			return {
				x: (e.clientX - CTM.e) / CTM.a,
				y: (e.clientY - CTM.f) / CTM.d
			};
		}

		function drawPath(startCoordinates, endCoordinates) {
			const path = document.createElementNS(SVG_NS, 'path');
			let direction = '';
			direction += `M${startCoordinates.x} ${startCoordinates.y}`;
			direction += ` L${endCoordinates.x} ${endCoordinates.y}`;

			setAttribute(path, 'd', direction);
			return path;
		}

		function setAttribute(node, attribute, value) {
			node.setAttributeNS(null, attribute, value);
		}
	}
}

customElements.define('kalligraphie-pad', KalliElement);
