<template>
  <ExercisePage :exercise-id="6">
    <Exercise title="6.1 Statistik-Balkendiagramm in SVG">

    </Exercise>

    <Exercise title="6.2 SVG Bezier-Animation">

    </Exercise>
  </ExercisePage>
</template>
<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api';
import ExercisePage from '~/components/ExercisePage.vue';
import Exercise from '~/components/Exercise.vue';

export default defineComponent({
  components: {Exercise, ExercisePage}
});
</script>
