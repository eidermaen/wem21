import {LitElement, html, css} from 'lit';

class ShoppingList extends LitElement {
  static properties = {
    label: {
      type: String
    },
    buttonText: {
      type: String
    },
    _elements: {
      type: Array,
    }
  }

  static styles = css`
		#form {
            width: 50%;
            border: 3px solid lightblue;
            padding: 1rem;
            border-radius: .4rem;
        }

        .form-group {
            width: 90%;
            margin-bottom: 1rem;
        }

        .input-group {
            display: flex;
            width: 100%;
        }

        label {
            display: block;
            color: lightblue;
        }

        input {
            width: 70%;
            padding: .5rem;
            outline: none;
            border: 2px solid lightgray;
            border-radius: .2rem;
            transition: all 200ms;
        }
        input:focus {
            border-color: #26C485;
        }

        button:hover {
            cursor: pointer;
        }

        #button {
            padding: .6rem 1rem;
            margin-left: .5rem;
            background-color: darkcyan;
            border: none;
            border-radius: .4rem;
            color: white;
            font-weight: bold;
            transition: all 200ms;
        }

        #button:hover {
            background-color: #26C485;
        }

        .btn-delete {
            background-color: #E63946;
            border: none;
            border-radius: .2rem;
            margin-left: .5rem;
            padding: .3rem .5rem;
            color: white;
        }

        .btn-delete:hover {

        }

        li {
            margin: .5rem 0;
        }
	`

  constructor () {
    super();
    this.label = 'Enter new item';
    this.buttonText = 'Add item';
    this._elements = [];
  }

  render () {
    return html`
            <form id="form" @submit="${this._submitForm}">
                <div class="form-group">
                    <label for="input">${this.label}: </label>
                    <div class="input-group">
                        <input type="text" id="input" required/>
                        <button type="submit" id="button">${this.buttonText}</button>
                    </div>
                </div>
            </form>

            <div>
                <ul id="list">
					${this._elements}
                </ul>
            </div>
		`
  }

  _submitForm(e) {
    e.preventDefault();

    const list = this.renderRoot.querySelector('#list');
    const input = this.renderRoot.querySelector('#input');
    const textContent = input.value;

    const liElement = document.createElement('li');
    const spanElement = document.createElement('span');

    spanElement.innerText = textContent;


    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.className = 'btn-delete';
    deleteButton.onclick = () => {
      list.removeChild(liElement)
    }

    liElement.append(spanElement, deleteButton);

    list.appendChild(liElement);
    input.value = null;
  }
}

customElements.define('shopping-list', ShoppingList);
