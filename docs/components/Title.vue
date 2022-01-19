<template>
  <h1 :class="sub ? 'text-2xl' : 'text-4xl'">
    <slot/>
  </h1>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  props: {
    sub: {
      type: Boolean,
      default: false,
    }
  }
});
</script>
