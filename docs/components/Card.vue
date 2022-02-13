<template>
  <div class="h-40 p-4 m-2 border rounded-lg border-green-600 bg-green-400
  hover:bg-green-300 text-white cursor-pointer transition-all duration-300 shadow-lg">
    <h3 class="text-xl font-bold">
      {{ title }}
    </h3>
    <p class="mt-2 text-gray-500">
      <slot/>
    </p>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'Card',
  props: {
    title: {
      type: String,
      required: true
    }
  }
})
</script>
