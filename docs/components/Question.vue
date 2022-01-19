<template>
  <h4 class="font-bold mt-2 text-gray-700">
    <slot/>
  </h4>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'Question',
});
</script>
