<template>
  <ExercisePage :exercise-id="7">
    <Exercise title="7.1 File Generatoren">
      <Question>
        Implementierung number_file_gen.js
      </Question>
      <div class="my-2">
        <Button @click="clickOpenGenerateModal('num')">
          Click to generate file ...
        </Button>
      </div>
      <CodeSnippet lang="js">
        import * as fs from 'fs';
        const input = process.argv[2];

        if (!input) {
        console.error('Please enter a number!');
        } else {
        const length = parseInt(input.replace('_', ''));
        let outputString = '';

        for (let i = 0; i < length; i++) {
        outputString += `${i}.\n`;
        }

        fs.writeFile('output.txt', outputString, err => {
        if (err) {
        console.error('Error while trying to create file', err);
        } else {
        console.log('File has been created successfully!');
        }
        });
        }
      </CodeSnippet>

      <Question>
        Implementierung alpha_file_gen.js
      </Question>
      <div class="my-2">
        <Button @click="clickOpenGenerateModal('alpha')">
          Click to generate file ...
        </Button>
      </div>
      <CodeSnippet lang="js">
        import * as fs from 'fs';
        const input = process.argv[2];

        if (!input) {
        console.error('Please enter a number!');
        } else {
        const length = parseInt(input.replace('_', ''));
        let outputString = '';


        for (let i = 0; i < length; i++) {
        const lineContent = getCharacter(i);
        outputString += `${lineContent}\n`;
        }

        fs.writeFile('output.txt', outputString, err => {
        if (err) {
        console.error('Error while trying to create file', err);
        } else {
        console.log('File has been created successfully!');
        }
        });
        }

        function getCharacter(i) {
        const diff = Math.floor(i / 26);
        if (diff === 0) {
        return String.fromCharCode((i + 65)).toUpperCase();
        }

        const output = [];
        const rest = i % 26;
        let tmp = getCharacter(div - 1);
        tmp += getCharacter(rest);
        output.push(tmp);

        return output.join('');
        }
      </CodeSnippet>
    </Exercise>

    <Exercise title="7.2 Performance Merge">
      <Question>
        Implementierung merge_files.js
      </Question>
      <div class="my-2">
        <Button @click="clickOpenMergeModal()">
          Click to merge files ...
        </Button>
      </div>
      <CodeSnippet lang="js">
        import * as fs from 'fs';
        import * as util from 'util';

        const readFile = util.promisify(fs.readFile);

        const firstFile = process.argv[2];
        const secondFile = process.argv[3];


        (async _ => {
        if (!firstFile || !secondFile) {
        console.error('Please provide 2 file names!');
        } else {
        let output = [[],[]];

        console.time('MERGE');

        const fileOne = await readFile(firstFile, 'utf8');
        const fileTwo = await readFile(secondFile, 'utf8');

        output[0].push(...fileOne.split('\n'));
        output[1].push(...fileTwo.split('\n'));

        const outputFile = 'output.txt';
        let outputString = '';
        const lengthA = output[0].length;
        const lengthB = output[1].length;
        const max = lengthA > lengthB ? lengthA : lengthB;

        for (let i = 0; i < max; i++) {
        let first = output[0][i] || '';
        let second = output[1][i] || '';

        outputString += `${first} ${second} \n`;
        }

        console.timeEnd('MERGE');

        fs.writeFile(outputFile, outputString, err => {
        if (err) {
        console.error(err);
        } else {
        console.log('Files merged! Check "output.txt".')
        }
        });
        }
        })();
      </CodeSnippet>

      <Question>
        Implementierung merge_streams.js
      </Question>

      <CodeSnippet lang="js">
        import * as fs from 'fs';
        import * as stream from 'stream';
        import * as util from 'util';

        const pipeline = util.promisify(stream.pipeline);

        const firstFile = process.argv[2];
        const secondFile = process.argv[3];

        (async _ => {
        if (!firstFile || !secondFile) {
        console.error('Please provide 2 file names!');
        } else {
        let output = [[],[]];

        console.time('MERGE');

        await pipeline(
        fs.createReadStream(firstFile, 'utf8'),
        async data => {
        for await (const chunk of data) {
        const split = chunk.split('\n');
        output[0].push(...split);
        }
        }
        );

        await pipeline(
        fs.createReadStream(secondFile, 'utf8'),
        async data => {
        for await (const chunk of data) {
        const split = chunk.split('\n');
        output[1].push(...split);
        }
        }
        );

        const outputFile = 'output.txt';
        let outputString = '';
        const lengthA = output[0].length;
        const lengthB = output[1].length;
        const max = lengthA > lengthB ? lengthA : lengthB;

        for (let i = 0; i < max; i++) {
        let first = output[0][i] || '';
        let second = output[1][i] || '';

        outputString += `${first} ${second} \n`;
        }

        console.timeEnd('MERGE');

        fs.writeFile(outputFile, outputString, err => {
        if (err) {
        console.error(err);
        } else {
        console.log('Files merged! Check "output.txt".')
        }
        });
        }
        })()
      </CodeSnippet>

      <Question>
        Ergebnisse Performance-Messung
      </Question>

      <Answer>
        <div>
          Merge files: ca. 2-4ms
        </div>
        <div>
          Merge stream: ca. 6-9ms
        </div>
      </Answer>
    </Exercise>

    <Exercise title="7.3 Express.js Server">
      <CodeSnippet lang="js">
        const express = require('express');
        const app = express();
        const bodyParser = require('body-parser');
        const multer = require('multer');
        const fs = require('fs');
        const path = require('path');
        const util = require('util');
        const promisify = util.promisify;

        const readFile = promisify(fs.readFile);
        const writeFile = promisify(fs.writeFile);

        const { customAlphabet } = require('nanoid');
        const nanoid = customAlphabet('abcdefghijklmnopqrstuvwxyz1234567890', 10);

        const upload = multer({
        storage: multer.memoryStorage()
        });

        const filesUpload = upload.fields([
        {name: 'first', maxCount: 1},
        {name: 'second', maxCount: 1}
        ]);

        app.set('view engine', 'hbs');

        app.use(bodyParser.json());
        app.use(bodyParser.urlencoded({
        extended: true
        }));
        app.use(express.json());

        app.get('/', (req, res) => {
        res.render('index');
        });

        app.get('/download', (req, res) => {
        const id = req.query.id;

        if (!id) {
        return res.redirect('/');
        }
        res.render('download', { id });
        });

        app.post('/rest/merge', filesUpload, async (req, res, next) => {
        const file1 = req.files.first[0].buffer.toString();
        const file2 = req.files.second[0].buffer.toString();

        const output = mergeFiles(file1, file2);
        const id = nanoid();

        try {
        await writeFile(`downloads/${id}.txt`, output);
        return res.redirect(`/download?id=${id}`);
        } catch (e) {
        return next(e);
        }

        });

        app.get('/rest/download/:id', async (req, res, next) => {
        const id = req.params.id;
        if (!id) {
        return res.redirect('/');
        }

        res.download(path.join(__dirname, `downloads/${id}.txt`), 'merge.txt');

        fs.unlink(`downloads/${id}.txt`, () => {});
        });

        app.use((err, req, res, next) => {
        console.error('Error', err);
        });

        app.listen(3000, () => {
        console.log('Servers started on port 3000.');
        });

        function mergeFiles(fileOne, fileTwo) {
        const output = [[],[]];
        output[0].push(...fileOne.split('\n'));
        output[1].push(...fileTwo.split('\n'));

        let outputString = '';
        const lengthA = output[0].length;
        const lengthB = output[1].length;
        const max = lengthA > lengthB ? lengthA : lengthB;

        for (let i = 0; i < max; i++) {
        let first = output[0][i] || '';
        let second = output[1][i] || '';

        outputString += `${first} ${second} \n`;
        }
        return outputString;
        }
      </CodeSnippet>
    </Exercise>

    <Modal :open="isGenerateModalOpen" @close="clickCloseModal">
      <template #header>
        Datei erstellen
      </template>

      <template #body>
        <LoadingAnimation v-if="isLoading"/>
        <BaseForm v-else :netlify="false" name="form" @submit.prevent="submitGenerateForm">
          <FormInput id="length" name="length" type="number" v-model.number="count" label="Anzahl der Zeilen" required
                     description="Gib an, wie viele Zeilen die Datei enthalten soll." min="1" max="10000"
          />

          <div class="mt-4 text-right">
            <Button variant="secondary" @click="clickCloseModal">Abbrechen</Button>
            <Button type="submit">Erstellen</Button>
          </div>
        </BaseForm>
      </template>

      <template #footer>
        <hr>
        <span class="text-sm text-gray-500">Running on Netlify Functions</span>
      </template>
    </Modal>

    <Modal :open="isMergeModalOpen" @close="clickCloseModal">
      <template #header>
        Dateien hochladen und mergen
      </template>

      <template #body>
        <LoadingAnimation v-if="isLoading"/>
        <BaseForm v-else :netlify="false" name="form" @submit.prevent="submitMergeForm">
          <FormInput id="one" name="one" type="file" label="Datei 1" required
                     description="Lade die erste Datei hoch." accept=".txt" @change="saveFile('fileOne', $event)"
          />

          <FormInput id="two" name="two" type="file" label="Datei 2" required
                     description="Lade die zweite Datei hoch." accept=".txt" @change="saveFile('fileTwo', $event)"
          />

          <div class="mt-4 text-right">
            <Button variant="secondary" @click="clickCloseModal">Abbrechen</Button>
            <Button type="submit">Erstellen</Button>
          </div>
        </BaseForm>
      </template>

      <template #footer>
        <hr>
        <span class="text-sm text-gray-500">Running on Netlify Functions</span>
      </template>
    </Modal>
  </ExercisePage>
</template>

<script lang="ts">
import {defineComponent} from '@nuxtjs/composition-api';
import Exercise from '~/components/Exercise.vue';
import ExercisePage from '~/components/ExercisePage.vue';
import CodeSnippet from '~/components/CodeSnippet.vue';
import Question from '~/components/Question.vue';
import Answer from '~/components/Answer.vue';
import Button from '~/components/Button.vue';
import Modal from '~/components/Modal.vue';
import BaseForm from '~/components/form/BaseForm.vue';
import BaseInput from '~/components/form/BaseInput.vue';
import FormInput from '~/components/form/FormInput.vue';
import {FileType, generateFile, mergeFiles, saveFile} from '~/utils/RESTController';
import LoadingAnimation from '~/components/animations/LoadingAnimation.vue';
import {ToastVariant} from '~/plugins/toast/Toast';

export default defineComponent({
  components: {
    LoadingAnimation,
    FormInput, BaseInput, BaseForm, Modal, Button, Answer, Question, CodeSnippet, ExercisePage, Exercise
  },

  data() {
    return {
      isGenerateModalOpen: false,
      isMergeModalOpen: false,
      count: 0,
      selectedType: 'num' as FileType,
      isLoading: false,
      fileOne: '',
      fileTwo: '',
    };
  },

  methods: {
    async saveFile(file: 'fileOne' | 'fileTwo', files: FileList) {
      const text = await files.item(0)?.text();
      if (text) {
         this[file] = text;
      }
    },

    clickOpenGenerateModal(type: FileType) {
      this.isGenerateModalOpen = true;
      this.selectedType = type;
    },

    clickOpenMergeModal() {
      this.isMergeModalOpen = true;
    },

    clickCloseModal() {
      this.isGenerateModalOpen = false;
      this.isMergeModalOpen = false;
      this.selectedType = 'num';
      this.count = 0;
      this.isLoading = false;
      this.fileOne = '';
      this.fileTwo = '';
    },

    async submitGenerateForm() {
      try {
        if (this.isLoading) {
          return;
        }

        this.isLoading = true;
        const count = this.count, type = this.selectedType;

        const data = await generateFile(type, count);
        this._showSuccessToast();

        saveFile(data, 'download.txt', 'text/plain');
      } catch (e) {
        this.$toaster('Fehler', `Fehler beim Erstellen der Datei: ${e.message}`, {
          variant: ToastVariant.ERROR
        }).show();
      } finally {
        this.isLoading = false;
        this.clickCloseModal();
      }
    },

    async submitMergeForm() {
      try {
        if (this.isLoading) {
          return;
        }

        this.isLoading = true;

        const data = await mergeFiles(this.fileOne, this.fileTwo);
        this._showSuccessToast();

        saveFile(data, 'download.txt', 'text/plain');
      } catch (e) {
        this.$toaster('Fehler', `Fehler beim Erstellen der Datei: ${e.message}`, {
          variant: ToastVariant.ERROR
        }).show();
      } finally {
        this.isLoading = false;
        this.clickCloseModal();
      }
    },

    _showSuccessToast() {
      this.$toaster('Erfolgreich', 'Datei erfolgreich erstellt', {
        variant: ToastVariant.SUCCESS
      }).show();
    }
  },
});
</script>
