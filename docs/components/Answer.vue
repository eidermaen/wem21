<template>
  <div class="mt-2 border rounded border-gray-500 p-2">
    <slot/>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'Answer'
});
</script>
