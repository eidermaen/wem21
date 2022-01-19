<template>
  <button class="cursor-pointer p-2 border rounded-lg border-green-700 bg-green-500
  hover:bg-green-400 text-white transition-all duration-200">
    <slot/>
  </button>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'Button'
});
</script>
