<template>
  <button @click="$emit('click', $event)" class="cursor-pointer p-2 border rounded-lg transition-all duration-200"
          :class="style" v-bind="$attrs">
    <slot/>
  </button>
</template>

<script lang="ts">
import {defineComponent} from '@nuxtjs/composition-api';

export default defineComponent({
  name: 'Button',
  props: {
    variant: {
      type: String,
      default: 'success'
    }
  },

  computed: {
    style(): string {
      switch (this.variant) {
        case 'success':
          return 'border-green-700 bg-green-500 hover:bg-green-400 text-white';
        case 'secondary':
          return 'border-gray-700 bg-gray-300 hover:bg-gray-200 text-gray-900';
        default:
          return '';
      }
    }
  }
});
</script>
