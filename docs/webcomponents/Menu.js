import {LitElement, html, css, unsafeCSS} from 'lit';

export class MenuWrapper extends LitElement {

  static properties = {
    vertical: {
      type: Boolean
    }
  }

  constructor () {
    super();

    this.vertical = false;
  }

  static styles = css`
		.container {
			display: flex;
            justify-content: space-around;
            align-items: center;
            flex-direction: ${this.vertical ? unsafeCSS('column') : unsafeCSS('row')};
		}
	`

  render() {
    return html`
			<div class="container">
				<slot @click="${this._clickButton}"></slot>
			</div>
		`
  }

  _clickButton = e => {
    var btn = e.target;
    this._slottedChildren.forEach(el => {
      if (el.getAttribute('id') === btn.getAttribute('id')) {
        el.setActive(true);
      } else {
        el.setActive(false);
      }
    })
  }

  get _slottedChildren() {
    const slot = this.shadowRoot.querySelector('slot');
    const childNodes = slot.assignedNodes({flatten: true});
    return Array.prototype.filter.call(childNodes, (node) => node.nodeType == Node.ELEMENT_NODE);
  }
}

export class MenuEntry extends LitElement {

  static properties = {
    id: {
      type: Number,
      state: true
    }
  };

  constructor () {
    super();
    this.active = false;
    this.setAttribute('id', this.getAttribute('id') || Math.floor(Math.random() * 1000));
  }

  static styles = css`
		.btn {
            padding: 1rem 1.5rem;
            border: none;
            border-radius: .6rem;
            background-color: orange;
            transition: all 300ms;
        }
        .btn:hover {
            cursor: pointer;
        }
        .btn-active {
            background-color: lightseagreen;
        }
	`

  render() {
    return html`
			<button class="btn ${this.active ? unsafeCSS(', btn-active') : ''}">
                <slot></slot>
			</button>
		`
  }

  setActive(value) {
    this.active = value;
    this.requestUpdate();
  }

  isActive() {
    return this.active;
  }
}
