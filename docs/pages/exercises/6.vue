<template>
  <ExercisePage :exercise-id="6">
    <Exercise title="6.1 Statistik-Balkendiagramm in SVG">
      <div class="overflow-x-scroll">
        <SvgDiagram :data="bundestag"/>
      </div>
    </Exercise>

    <Exercise title="6.2 SVG Bezier-Animation">
      <div class="overflow-x-scroll">
        <Bezier></Bezier>
      </div>
    </Exercise>

    <Exercise title="6.3 Kalligraphie">
      <Kalligraphie></Kalligraphie>
    </Exercise>
  </ExercisePage>
</template>
<script lang="ts">
import {defineComponent} from '@nuxtjs/composition-api';
import ExercisePage from '~/components/ExercisePage.vue';
import Exercise from '~/components/Exercise.vue';
import {data} from '~/data/bundestag';
import {Context} from '@nuxt/types';
import SvgRect from '~/components/exercises/SvgRect.vue';
import SvgDiagram from '~/components/exercises/SvgDiagram.vue';
import Bezier from '~/components/exercises/Bezier.vue';
import Kalligraphie from '~/components/exercises/Kalligraphie.vue';

export default defineComponent({
  components: {Kalligraphie, SvgDiagram, SvgRect, Exercise, ExercisePage, Bezier},

  asyncData(ctx: Context): Promise<object | void> | object | void {
    return {
      bundestag: data,
    }
  }
});
</script>
