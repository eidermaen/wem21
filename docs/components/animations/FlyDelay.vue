<template>
  <div class="animate-flyindelay opacity-0">
    <slot></slot>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'FlyDelay',

})
</script>
