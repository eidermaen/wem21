<template>
  <a :href="to">
    <slot />
  </a>
</template>

<script lang="ts">
import {defineComponent} from '@nuxtjs/composition-api';

export default defineComponent({
  props: {
    to: {
      type: String,
      required: true
    }
  }
});
</script>

<style scoped>
a {
  margin: .5rem;
  padding: 1rem 1.5rem;
  border: none;
  border-radius: .6rem;
  background-color: orange;
  transition: all 300ms;
  cursor: pointer;
  text-decoration: none;
}

a:hover {
  background-color: lightseagreen;
}
</style>
