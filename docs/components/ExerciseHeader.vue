<template>
  <div class="my-4">
    <Title>
      {{ exercise.id }}: {{ exercise.title }}
    </Title>

    <p class="mt-2">
      {{ exercise.description }}
    </p>

    <hr class="mt-4">
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import exercises from '~/data/exercises';

export default Vue.extend({
  name: 'ExerciseHeader',

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
