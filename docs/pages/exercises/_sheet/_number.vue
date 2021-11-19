<template>
  <div>
    <BackButton @click="$router.push(`/exercises/${sheet}`)">
      Zurück zum Aufgabenblatt
    </BackButton>

    <h1>
      Aufgabe {{ sheet }}.{{ number }}
    </h1>

    <div class="content" ref="content">
      {{ fileContent }}
    </div>
  </div>
</template>

<script>
import config from '~/data/data.json'
import BackButton from '../../../components/BackButton';

export default {
  components: {BackButton},
  async asyncData({ params }) {
    try {
      const fs = process.server ? require('fs') : null;
      const PROMISES = fs?.promises;

      const { number, sheet } = params;
      const fetchedConfig = config[sheet];
      const [exercise] = fetchedConfig.exercises.filter(e => e.id === parseInt(number));

      const fileContent = await PROMISES?.readFile('data' + exercise.file, 'utf8');

      let output = {
        sheet,
        number,
        config: fetchedConfig,
        exercise,
        fileContent
      };

      return output;
    } catch (e) {
      console.error('Error while trying to fetch content', e);
    }
  }
}
</script>
