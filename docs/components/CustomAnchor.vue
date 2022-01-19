<template>
  <a :href="$attrs.href" :target="$attrs.target">
    <slot/>
  </a>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'CustomAnchor',

});
</script>

<style scoped>
a {
  @apply text-red-600 hover:underline;
}
</style>
