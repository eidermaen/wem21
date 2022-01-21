<template>
  <ExercisePage :exercise-id="4">
    <Info variant="info" title="Info zur Umsetzung">
      Um das CSS für diese Aufgabe richtig rendern zu können und den Javascript-Code isoliert laufen lassen zu können,
      wird die Liste in ein iFrame eingebettet, was diese Isolierung erlaubt.
    </Info>

    <Exercise title="4.1 Einkaufsliste">
      <iframe src="/external/4/einkaufsliste.html" width="100%" height="300"></iframe>
    </Exercise>

    <Exercise title="4.2 Rednerliste mit Zeitmessung">
      <iframe src="/external/4/rednerliste.html" width="100%" height="300"></iframe>
    </Exercise>

    <Exercise title="4.3 Tabellenkalkulation">
      <iframe src="/external/4/tabellenkalkulation.html" width="100%" height="900"></iframe>
    </Exercise>

    <Exercise title="4.4 HTML-Editor">
      <iframe src="/external/4/wysiwyg.html" width="100%" height="500"></iframe>
    </Exercise>
  </ExercisePage>

</template>

<script lang="ts">
import {defineComponent} from '@nuxtjs/composition-api';
import Exercise from '~/components/Exercise.vue';
import Info from '~/components/Info.vue';
import ExercisePage from '~/components/ExercisePage.vue';

export default defineComponent({
  components: {ExercisePage, Info, Exercise},
});
</script>
