export interface Range {
  column: number,
  row: number
}

export const ALPHABET = [
  'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M',
  'N', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'
];

export enum Direction {
  ENTER,
  UP,
  DOWN,
  LEFT,
  RIGHT
};

export interface TableConfig {
  rows: number,
  columns: number,
}

export interface Formula {
  fn: (a: number, b: number) => number,
  start: number
};

export const FORMULAS: { [name: string]: Formula } = {
  sum: {
    fn: (a, b) => a + b,
    start: 0,
  },
  mul: {
    fn: (a, b) => a * b,
    start: 1
  }
}

export class Parser {
  private readonly formula: string;

  constructor(formula: string) {
    this.formula = formula;
  }

  isFormula(): boolean {
    const regex = new RegExp('^=(.*)\\(.*:.*\\)');
    return regex.test(this.formula);
  }

  getFormulaName(): string | null {
    const regex = /(?<==)([a-zA-Z]*)(?<!\()/;
    const matches = this.formula.match(regex);
    if (!matches?.length) return null;

    return matches[0].toLowerCase();
  }

  getRange(): Range[] | undefined {
    const regex = /(?<=\()(.*)(?<!\))/;

    const matches = this.formula.match(regex);

    if (!matches?.length) return undefined;

    const groups = matches[0].split(':');
    const result: Range[] = [];

    groups.forEach(group => {
      const column = group.trim().substring(0, 1);
      const row = parseInt(group.trim().substring(1));

      result.push({
        column: ALPHABET.findIndex(v => v === column.toUpperCase()) + 1,
        row: row
      });
    });

    return result;
  }

  static getCellId(row: number | string, column: number | string): string {
    return `cell-${row}.${column}`;
  }

  static getNextId(currentId: string, config: TableConfig, direction: Direction): string | null {

    const regex = /(?<=cell-)(.*)/;
    const match = currentId.match(regex)?.[0]!;

    const row = parseInt(match.split('.')[0]);
    const column = parseInt(match.split('.')[1]);

    switch (direction) {
      case Direction.ENTER:
      case Direction.DOWN:
        if (row + 1 <= config.rows) {
          return this.getCellId(row + 1, column);
        }
        break;

      case Direction.UP:
        if (row - 1 > 0) {
          return this.getCellId(row - 1, column);
        }
        break;
      case Direction.LEFT:
        if (column - 1 > 0) {
          return this.getCellId(row, column - 1);
        }
        break;
      case Direction.RIGHT:
        if (column + 1 <= config.columns) {
          return this.getCellId(row, column + 1);
        }
        break;
    }
    return null;
  }
}
