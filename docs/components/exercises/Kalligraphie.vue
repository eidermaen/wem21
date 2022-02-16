<template>
  <div class="container">
    <div class="outer">
      <svg id="editor">
      </svg>
    </div>
  </div>
</template>

<script lang="ts">
import {defineComponent} from '@nuxtjs/composition-api';

export default defineComponent({});
</script>

<style scoped>
.container {
  position: relative;
  width: 100%;
  height: 400px;
  padding: 5px;
  @apply border-2 rounded-lg border-gray-400;
}

#editor {
  position: relative;
  background-color: white;
  padding: 2rem;
  width: 100%;
  height: 80%;
  cursor: cell;
}

path {
  fill: none;
  stroke: black;
  stroke-width: 2;
}
</style>
