<template>
  <ExercisePage :exercise-id="6">
    <Exercise title="6.1 Statistik-Balkendiagramm in SVG">
      <SvgDiagram :data="bundestag" />
    </Exercise>

    <Exercise title="6.2 SVG Bezier-Animation">

    </Exercise>
  </ExercisePage>
</template>
<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api';
import ExercisePage from '~/components/ExercisePage.vue';
import Exercise from '~/components/Exercise.vue';
import { data } from '~/data/bundestag';
import {Context} from '@nuxt/types';
import SvgRect from '~/components/exercises/SvgRect.vue';
import SvgDiagram from '~/components/exercises/SvgDiagram.vue';

export default defineComponent({
  components: {SvgDiagram, SvgRect, Exercise, ExercisePage},

  asyncData(ctx: Context): Promise<object | void> | object | void {
    return {
      bundestag: data,
    }
  }
});
</script>
