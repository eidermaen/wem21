<template>
  <ExerciseWrapper>
    <Title sub>
      {{ title }}
    </Title>

    <div class="mt-2">
      <slot/>
    </div>
  </ExerciseWrapper>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'Exercise',

  props: {
    title: {
      type: String,
      required: true
    }
  }
});
</script>
