<template>
  <div>
    <BaseForm @submit.prevent="createTable" v-if="showSetupForm" name="setup" :netlify="false"
              class="p-4 border-3 border-blue-200 rounded">

      <FormInput type="number" name="columns" id="columns" label="Spalten"
                 v-model.number="config.columns" required description="Gib die Anzahl der zu erstellenden Spalten ein."
      />

      <FormInput type="number" name="rows" id="rows" label="Zeilen"
                 v-model.number="config.rows" required description="Gib die Anzahl der zu erstellenden Zielen ein."
      />

      <div v-if="showErrorMessage" class="my-4 text-red-500 text-sm">
        Bitte Werte > 0 eintragen!
      </div>

      <Button type="submit">Tabelle erstellen</Button>
    </BaseForm>

    <div v-if="!showSetupForm">
      <Button @click="resetTable" class="my-2">Reset</Button>
      <table>
        <tr v-for="row in range(config.rows)" :key="`row-${row}`">
          <td v-for="column in range(config.columns)"
              v-bind="cellConfiguration(row, column)"
              @click="onClickCell"
              @keydown.esc="$event.target.blur()"
              @keydown.enter.prevent="onKeySelectNext($event, cellConfiguration(row, column).id, Direction.ENTER)"
              @keydown.left.prevent="onKeySelectNext($event, cellConfiguration(row, column).id, Direction.LEFT)"
              @keydown.right.prevent="onKeySelectNext($event, cellConfiguration(row, column).id, Direction.RIGHT)"
              @keydown.up.prevent="onKeySelectNext($event, cellConfiguration(row, column).id, Direction.UP)"
              @keydown.down.prevent="onKeySelectNext($event, cellConfiguration(row, column).id, Direction.DOWN)"
              @blur="onCellBlur"
          >
            {{ cellContent(row, column) }}
          </td>
        </tr>

      </table>
    </div>

  </div>

</template>

<script lang="ts">
import {defineComponent, reactive, ref} from '@nuxtjs/composition-api';
import BaseForm from '~/components/form/BaseForm.vue';
import FormInput from '~/components/form/FormInput.vue';
import range from '~/utils/range';
import {ALPHABET, Direction, FORMULAS, Parser, TableConfig} from '~/utils/Parser';
import Button from '~/components/Button.vue';

export default defineComponent({
  components: {Button, FormInput, BaseForm},

  setup(props: any, {refs}) {
    const showSetupForm = ref(true);
    const showErrorMessage = ref(false);
    const config = reactive<TableConfig>({
      rows: 0,
      columns: 0
    });

    const createTable = () => {
      showErrorMessage.value = false;

      if (!(config.columns > 0 && config.rows > 0)) {
        showErrorMessage.value = true;
        return;
      }

      showSetupForm.value = false;
    }

    const resetTable = () => {
      showSetupForm.value = true;
      config.rows = 0;
      config.columns = 0;
    }

    const cellConfiguration = (row: number, column: number) => {
      const id = Parser.getCellId(row, column);

      let data = {
        id,
        ref: id,
        contentEditable: (row > 0 && column > 0),
        class: (row > 0 && column > 0) && 'input-cell',
      };

      return data;
    }

    const cellContent = (row: number, column: number) => {
      if (row !== 0 && column == 0) {
        return row.toString();
      } else if (row == 0 && column !== 0) {
        return ALPHABET[column - 1];
      }
    }

    const onKeySelectNext = (event: any, currentId: string, direction: Direction) => {
      event.target.blur();

      const nextId = Parser.getNextId(currentId, config, direction);
      if (nextId) {
        (refs[nextId] as any)?.focus();
      }
    }

    const onClickCell = (e: any) => {
      const cell = e.target;
      const formula = cell.dataset.formula;
      if (formula) {
        cell.textContent = formula;
      }
    }

    const onCellBlur = (e: any) => {
      onBlurCalculate(e.target);
      rerenderTable();
    }

    const onBlurCalculate = (currentCell: any, enteredValue = currentCell.textContent?.trim()) => {
      if (!currentCell) return;

      const parser = new Parser(enteredValue);


      if (!parser.isFormula()) {
        currentCell.classList.remove('formula-cell');
        delete currentCell.dataset.formula;
        return;
      }

      const formulaName = parser.getFormulaName();
      if (!formulaName) return;

      const formulaCalculation = FORMULAS[formulaName.toLowerCase()];
      if (!formulaCalculation) return;

      const range = parser.getRange();
      if (!range) return;

      const rawValuesToCalculate: number[] = [];
      for (let i = range[0].row; i < (range[1].row + 1); i++) {
        for (let j = range[0].column; j < (range[1].column + 1); j++) {
          const cell: any = refs[Parser.getCellId(i, j)];
          const content = cell?.textContent && parseInt(cell?.textContent);
          content && rawValuesToCalculate.push(content);
        }
      }

      const result = rawValuesToCalculate.reduce(formulaCalculation.fn, formulaCalculation.start);
      currentCell.textContent = String(result);
      currentCell.classList.add('formula-cell');
      currentCell.dataset.formula = enteredValue;
    }

    const rerenderTable = () => {
      for (let row = 1; row < config.rows +1; row++) {
        for (let column = 1; column < config.columns + 1; column++) {
          const cellId = Parser.getCellId(row, column);
          const cell: any = refs[cellId];
          const formula = cell?.dataset?.formula;
          if (formula) {
            onBlurCalculate(cell, formula);
          }
        }
      }
    };


    return {
      showSetupForm,
      showErrorMessage,
      config,
      createTable,
      resetTable,
      range,
      cellConfiguration,
      cellContent,
      onKeySelectNext,
      Direction,
      onCellBlur,
      onClickCell,
    }
  }
});
</script>

<style scoped>
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
</style>
