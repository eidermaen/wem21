<template>
  <div class="my-4">
    <div class="md:flex md:flex-row md:justify-between md:items-center">
      <div class="flex flex-row">
        <div class="text-gray-700">
          <CapIcon class="w-12 h-12 animate-flyin"/>
        </div>

        <div class="ml-4">
          <FlyDelay direction="left">
            <Title>
              {{ exercise.id }}: {{ exercise.title }}
            </Title>

            <p class="mt-2">
              {{ exercise.description }}
            </p>
          </FlyDelay>
        </div>
      </div>

      <div class="mt-6 md:mt-0">
        <CustomLink to="/">
          &larr; Zurück zur Übersicht
        </CustomLink>
      </div>
    </div>

    <hr class="mt-4">

    <TOC class="mt-4" depth="h2"/>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import exercises from '~/data/exercises';
import CapIcon from '~/components/icons/CapIcon.vue';
import FlyDelay from '~/components/animations/FlyDelay.vue';
import CustomLink from '~/components/CustomLink.vue';
import DoubleLeftIcon from '~/components/icons/DoubleLeftIcon.vue';

export default Vue.extend({
  name: 'ExerciseHeader',
  components: {DoubleLeftIcon, CustomLink, FlyDelay, CapIcon},
  props: {
    id: {
      type: Number,
      required: true,
    }
  },

  data() {
    return {
      exercise: {}
    }
  },

  created() {
    this.exercise = exercises.find(ex => ex.id === Number(this.id)) || {};
  }
});
</script>
