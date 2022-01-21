<template>
  <div class="my-4">
    <label :for="id" class="relative inline-block text-md text-gray-600" :class="required ? 'required' : ''">
      {{ label }}
    </label>
    <slot></slot>
  </div>
</template>

<script lang="ts">
import {defineComponent} from '@nuxtjs/composition-api';

export default defineComponent({
  props: {
    id: {
      type: String,
      required: true,
    },
    label: {
      type: String,
      required: true,
    },
    required: {
      type: Boolean,
      default: false
    },
  },
});
</script>

<style scoped>
.required:after {
  content: '*';
  font-size: 12px;
  position: absolute;
  right: -6px;
  top: 0px;
  @apply text-red-500;
}

.form-input {
  @apply w-full p-2 rounded border-2 border-gray-300 outline-none focus:border-green-500 transition-all duration-200;
}
</style>
