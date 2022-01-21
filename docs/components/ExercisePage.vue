<template>
  <div>
    <ExerciseHeader :id="exerciseId" />

    <slot />
  </div>
</template>

<script lang="ts">
import {defineComponent, useMeta} from '@nuxtjs/composition-api';
import getMeta from '~/utils/getMeta';

export default defineComponent({
  props: {
    exerciseId: {
      type: Number,
      required: true
    }
  },

  setup(props: any) {
    useMeta(() => getMeta(props.exerciseId));
  },

  head: {}

});
</script>
