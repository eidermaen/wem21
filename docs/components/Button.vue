<template>
  <button @click="$emit('click', $event)" v-bind="$attrs" class="cursor-pointer p-2 border rounded-lg border-green-700 bg-green-500
  hover:bg-green-400 text-white transition-all duration-200">
    <slot/>
  </button>
</template>

<script lang="ts">
import {defineComponent} from '@nuxtjs/composition-api';

export default defineComponent({
  name: 'Button'
});
</script>
