const ALPHABET = [
	'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M',
	'N', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'
];

const TABLE_CONFIG = {
	rows: 0,
	columns: 0,
}

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

const getNextId = (currentId) => {
	const regex = /(?<=cell-)(.*)/;
	const [match] = currentId.match(regex);
	const row = parseInt(match.split('.')[0]);
	const column = parseInt(match.split('.')[1]);

	if (row + 1 <= TABLE_CONFIG.rows) {
		return `cell-${row+1}.${column}`
	}
	return null;
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

const blur = e => {
	if (e.key === 'Escape') {
		e.target.blur();
	}
	else if (e.key === 'Enter') {
		const id = e.target.id;
		e.preventDefault();
		e.target.blur();

		const nextId = getNextId(id);
		if (nextId) {
			const nextNode = document.getElementById(nextId);
			if (nextNode) {
				nextNode.focus();
			}
		}
	}
};

const onDbSelectText = e => {
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

const onClickCell = e => {
	const node = e.target;
	const formula = node.dataset.formula;
	if (formula) {
		node.textContent = formula;
	}
}

const rerenderTable = () => {
	const tdList = table.querySelectorAll('.input-cell');
	tdList.forEach(node => {
		const formula = node.dataset.formula;
		if (formula) {
			onCellBlur(node, formula);
		}
	});
}

const onCellBlur = (node, enteredValue = node.textContent) => {
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
						const td = document.getElementById(`cell-${i}.${j}`);
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

const form = document.getElementById('form');
const table = document.getElementById('table');

form.onsubmit = e => {
	e.preventDefault();
	table.innerHTML = '';

	const columnInput = document.getElementById('columns');
	const rowInput = document.getElementById('rows');
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
				td.onkeydown = blur;
				td.ondblclick = onDbSelectText;
				td.onblur = (e) => {
					onCellBlur(e.target);
					rerenderTable();
				};
				td.onclick = onClickCell;
			}

			tr.appendChild(td);
		}

		table.appendChild(tr);
	}
}
