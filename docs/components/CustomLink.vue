<template>
  <nuxt-link v-if="nuxt" :to="$attrs.to" class="style">
    <slot/>
  </nuxt-link>

  <a v-else class="style" :target="$attrs.target" :href="$attrs.to">
    <slot/>
  </a>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'CustomLink',
  props: {
    nuxt: {
      type: Boolean,
      default: true
    }
  }
});
</script>

<style scoped>
.style {
  @apply cursor-pointer p-2 border rounded-lg border-green-700 bg-green-500 hover:bg-green-400 text-white transition-all duration-200;
}
</style>
