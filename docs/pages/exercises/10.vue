<template>
  <ExercisePage :exercise-id="10">
    <Info title="Info" variant="info">
      Da die Seite mit NuxtJS erstellt wurde, besteht die komplette UI aus VueJS Komponenten.
      <br>
      Die erstellen Vue-Komponenten für Übung 10 können im Storybook gefunden werden.
    </Info>
  </ExercisePage>
</template>

<script lang="ts">
import {defineComponent} from '@nuxtjs/composition-api';
import ExercisePage from '~/components/ExercisePage.vue';
import Info from '~/components/Info.vue';

export default defineComponent({
  components: {Info, ExercisePage}
});
</script>
