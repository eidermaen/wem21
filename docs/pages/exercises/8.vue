<template>
  <ExercisePage :exercise-id="8">
    <Exercise title="81. Web-Komponenten erstellen">
      <Info title="Info" variant="info">
        Die Web-Komponenten können im Storybook angeguckt werden.
      </Info>
    </Exercise>
  </ExercisePage>
</template>

<script lang="ts">
import {defineComponent} from '@nuxtjs/composition-api';
import ExercisePage from '~/components/ExercisePage.vue';
import Exercise from '~/components/Exercise.vue';
import Info from '~/components/Info.vue';

export default defineComponent({
  components: {Info, Exercise, ExercisePage}
});
</script>
