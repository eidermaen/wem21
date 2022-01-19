<template>
  <div>
    <ExerciseHeader :id="2" />

    <Exercise title="2.1. Responsiv mit Flexbox Desktop-First">
      <CustomLink :nuxt="false" target="_blank" to="/external/2/desktop-first.html">
        Link zum Wireframe
      </CustomLink>
    </Exercise>

    <Exercise title="2.2. Responsiv mit Grid Mobile-First">
      <CustomLink :nuxt="false" target="_blank" to="/external/2/mobile-first.html">
        Link zum Wireframe
      </CustomLink>
    </Exercise>

    <Exercise title="2.3. Holy Grail">
      <CustomLink :nuxt="false" target="_blank" to="/external/2/holy-grail-flex.html">
        Link zum Wireframe (Flexbox)
      </CustomLink>

      <div class="mt-6">
        <CustomLink :nuxt="false" target="_blank" to="/external/2/holy-grail-grid.html">
          Link zum Wireframe (Gridbox)
        </CustomLink>
      </div>
    </Exercise>

    <Exercise title="2.4. Responsiv mit Grid">
      <CustomLink :nuxt="false" target="_blank" to="/external/2/landing.html">
        Link zum Wireframe
      </CustomLink>
    </Exercise>
  </div>

</template>

<script lang="ts">
import Vue from 'vue';
import exercises from '~/data/exercises';
import Title from '~/components/Title.vue';
import ExerciseHeader from '~/components/ExerciseHeader.vue';
import ExerciseWrapper from '~/components/ExerciseWrapper.vue';
import CustomLink from '~/components/CustomLink.vue';
import Exercise from '~/components/Exercise.vue';

export default Vue.extend({
  components: {Exercise, CustomLink, ExerciseWrapper, ExerciseHeader, Title},
  asyncData(): Promise<object | void> | object | void {
    return {
      exercise: exercises.find(ex => ex.id === 1)
    }
  }
});
</script>
