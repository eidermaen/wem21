<template>
  <button :class="{selected}" @click="$emit('click', $event)">
    <slot></slot>
  </button>
</template>

<script lang="ts">
import {defineComponent} from '@nuxtjs/composition-api';

export default defineComponent({
  props: {
    selected: {
      type: Boolean,
      default: false
    }
  }
});

</script>

<style scoped>
button {
  margin: .5rem;
  padding: 1rem 1.5rem;
  border: none;
  border-radius: .6rem;
  background-color: orange;
  transition: all 300ms;
  cursor: pointer;
  text-decoration: none;
}

.selected {
  background-color: lightseagreen;
}
</style>
