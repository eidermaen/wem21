import {LitElement, html, css} from 'lit';

class RednerListe extends LitElement {

  static properties = {
    label: {
      type: String
    },
    buttonText: {
      type: String
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

        li {
            margin: 1rem 0;
        }

        .span-name, .span-time {
            margin-right: 1rem;
        }

        .btn {
            border: none;
            border-radius: .3rem;
            padding: .3rem .7rem;
        }

        .btn-start {
            background-color: #26C485;
        }

        .btn-stop {
            background-color: #E63946;
        }

        .btn-reset {
        	margin-left: 5px;
        }
	`

  constructor () {
    super();
    this.label = 'Neuer Redner';
    this.buttonText = 'Hinzufügen';
  }

  render() {
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
                <ul id="list"></ul>
            </div>
		`
  }

  _submitForm(e) {
    e.preventDefault();
    const input = this.renderRoot.getElementById('input');
    const list = this.renderRoot.getElementById('list');

    const speakerId = `speaker-${list.children.length}`;
    let seconds = 0, minutes = 0, hours = 0;

    const timer = () => {
      seconds++;

      if (seconds == 60) {
        seconds = 0;
        minutes++;
      }
      if (minutes == 60) {
        minutes = 0;
        hours++;
      }

      const formatted = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
      dateSpan.textContent = formatted;
    };
    let interval;

    const name = input.value;
    const nameSpan = document.createElement('span');
    nameSpan.className = 'span-name';
    nameSpan.textContent = name;

    const dateSpan = document.createElement('span');
    dateSpan.className = 'span-time';
    dateSpan.textContent = '00:00:00';

    const liElement = document.createElement('li');
    liElement.id = speakerId;
    const startButton = document.createElement('button');
    startButton.classList.add('btn', 'btn-start');
    startButton.textContent = 'Start!';
    startButton.onclick = () => {
      list.childNodes.forEach(node => {
        if (node.id !== speakerId) {
          node.querySelector('.btn-stop').click();
        }
      });

      interval = setInterval(timer, 1000);
      startButton.hidden = true;
      stopButton.hidden = false;
    };

    const stopButton = document.createElement('button');
    stopButton.classList.add('btn', 'btn-stop');
    stopButton.textContent = 'Stop!';
    stopButton.hidden = true;
    stopButton.onclick = () => {
      clearInterval(interval);
      startButton.hidden = false;
      stopButton.hidden = true;
    };

    const resetButton = document.createElement('button');
    resetButton.classList.add('btn', 'btn-reset');
    resetButton.textContent = 'Reset';
    resetButton.onclick = () => {
      clearInterval(interval);
      startButton.hidden = false;
      stopButton.hidden = true;
      dateSpan.textContent = '00:00:00';
    }

    liElement.append(nameSpan, dateSpan, startButton, stopButton, resetButton);
    list.appendChild(liElement);
    input.value = null;
  }
}

customElements.define('redner-liste', RednerListe);
