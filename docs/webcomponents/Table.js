import {LitElement, html, css} from 'lit';

const ALPHABET = [
  'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M',
  'N', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'
];

const TABLE_CONFIG = {
  rows: 0,
  columns: 0,
}

const AVAILABLE_FORMULAS = {
  'sum': {
    fn: (a, b) => a + b,
    start: 0,
  },
  'mul': {
    fn: (a, b) => a * b,
    start: 1,
  },
};

const Parser = function (input) {
  return {
    isFormula: () => {
      const regex = new RegExp('^=(.*)\\(.*:.*\\)');
      return regex.test(input);
    },
    getFormulaName: () => {
      const regex = /(?<==)([a-zA-Z]*)(?<!\()/;
      const matches = input.match(regex);
      if (!matches.length) return '';
      return matches[0].toLowerCase();
    },
    getRange: () => {
      const regex = /(?<=\()(.*)(?<!\))/;
      const matches = input.match(regex);
      if (!matches.length) return undefined;

      const groups = matches[0].split(':');
      const result = [];

      groups.forEach(group => {
        const column = group.trim().substring(0,1);
        const row = parseInt(group.trim().substring(1));

        result.push({
          column: ALPHABET.findIndex(v => v === column.toUpperCase()) + 1,
          row: row
        });
      });

      return result;
    },
  }
}

class TableCalcElement extends LitElement {

  static styles = css`
		form {
            margin: 1rem 0;
            width: 50%;
        }

        .form-group {
            margin-top: .9rem;
        }

        label {
            display: block;
            color: darkcyan;
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

        .button {
            padding: .6rem 1rem;
            background-color: darkcyan;
            border: none;
            border-radius: .4rem;
            color: white;
            font-weight: bold;
            transition: all 200ms;
        }

        .button:hover {
            background-color: #26C485;
        }

        table {
            border-collapse: collapse;
            text-align: right;
            width: 100%;
            table-layout: fixed;
        }

        td {
            border: 1px solid black;
            padding: 8px;
        }

        td:nth-child(1), tr:nth-child(1) {
            background-color: #e1e2ee;
        }

        td:nth-child(1) {
            width: 5%;
        }

        .input-cell {
            cursor: pointer;
        }

        .input-cell:focus {
            background-color: #26C485;
        }

        .formula-cell {
            background-color: lightseagreen;
        }
	`

  constructor () {
    super();
    this.form = null;
    this.table = null;
  }

  render() {
    return html`
            <form id="form" @submit="${this._submitForm}">
                <div class="form-group">
                    <label for="columns">Spalten:</label>
                    <input type="number" id="columns" required min="1">
                </div>

                <div class="form-group">
                    <label for="rows">Zeilen:</label>
                    <input type="number" id="rows" required min="1">
                </div>

                <div class="form-group">
                    <button class="button" type="submit">Generate Table</button>
                </div>
            </form>

            <table id="table"></table>
		`
  }

  _submitForm(e) {
    e.preventDefault();
    this.form = this.renderRoot.getElementById('form');
    this.table = this.renderRoot.getElementById('table');

    this.table.innerHTML = '';

    const columnInput = this.renderRoot.getElementById('columns');
    const rowInput = this.renderRoot.getElementById('rows');
    const columnRaw = parseInt(columnInput.value);
    const rowRaw = parseInt(rowInput.value);

    TABLE_CONFIG.columns = columnRaw;
    TABLE_CONFIG.rows = rowRaw;

    for (let i = 0; i < rowRaw + 1; i++) {
      const tr = document.createElement('tr');

      for (let j = 0; j < columnRaw + 1; j++) {
        const td = document.createElement('td');
        if (j === 0 && i !== 0) {
          td.textContent = i.toString();
        }
        else if (j !== 0 && i === 0) {
          td.textContent = ALPHABET[j - 1];
        }
        else if (j !== 0 || i !== 0) {
          td.contentEditable = 'true';
          td.className = 'input-cell';
          td.id = `cell-${i}.${j}`;
          td.onkeydown = this._blur;
          td.ondblclick = this._onDbSelectText;
          td.onblur = (e) => {
            this._onCellBlur(e.target);
            this._rerenderTable();
          };
          td.onclick = this._onClickCell;
        }

        tr.appendChild(td);
      }

      this.table.appendChild(tr);
    }
  }

  _getNextId = (currentId) => {
    const regex = /(?<=cell-)(.*)/;
    const [match] = currentId.match(regex);
    const row = parseInt(match.split('.')[0]);
    const column = parseInt(match.split('.')[1]);

    if (row + 1 <= TABLE_CONFIG.rows) {
      return `cell-${row+1}.${column}`
    }
    return null;
  }

  _blur = e => {
    if (e.key === 'Escape') {
      e.target.blur();
    }
    else if (e.key === 'Enter') {
      const id = e.target.id;
      e.preventDefault();
      e.target.blur();

      const nextId = this._getNextId(id);
      if (nextId) {
        const nextNode = this.renderRoot.getElementById(nextId);
        if (nextNode) {
          nextNode.focus();
        }
      }
    }
  };

  _onDbSelectText = e => {
    const node = e.target;
    if (document.body.createTextRange) {
      const range = document.body.createTextRange();
      range.moveToElementText(node);
      range.select();
    } else if (window.getSelection) {
      const selection = window.getSelection();
      const range = document.createRange();
      range.selectNodeContents(node);
      selection.removeAllRanges();
      selection.addRange(range);
    }
  }

  _onClickCell = e => {
    const node = e.target;
    const formula = node.dataset.formula;
    if (formula) {
      node.textContent = formula;
    }
  }

  _rerenderTable = () => {
    const tdList = this.table.querySelectorAll('.input-cell');
    tdList.forEach(node => {
      const formula = node.dataset.formula;
      if (formula) {
        this._onCellBlur(node, formula);
      }
    });
  }

  _onCellBlur = (node, enteredValue = node.textContent) => {
    const newFormula = Parser(enteredValue);

    if (enteredValue && newFormula.isFormula()) {
      const formulaName = newFormula.getFormulaName();

      if (formulaName) {
        const formulaCalculation = AVAILABLE_FORMULAS[formulaName.toLowerCase()];

        if (!formulaCalculation) {
          alert(`Invalid formula. Valid formulas are ${Object.keys(AVAILABLE_FORMULAS)}`);
          return;
        } else {
          const range = newFormula.getRange();
          const rawValuesToCalculate = [];

          for (let i = range[0].row; i < (range[1].row + 1); i++) {
            for (let j = range[0].column; j < (range[1].column + 1); j++) {
              const td = this.renderRoot.getElementById(`cell-${i}.${j}`);
              const content = td && td.textContent && parseInt(td.textContent);
              content && rawValuesToCalculate.push(content);
            }
          }

          const result = rawValuesToCalculate.reduce(formulaCalculation.fn, formulaCalculation.start);
          node.textContent = result;
          node.classList.add('formula-cell');
          node.dataset.formula = enteredValue;
        }
      }
    } else {
      node.classList.remove('formula-cell');
      delete node.dataset.formula;
    }

    return;
  }
}

customElements.define('excel-table', TableCalcElement);
