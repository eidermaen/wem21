<template>
  <div class="mt-2 border rounded border-gray-500 p-2">
    <slot/>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api';

export default defineComponent({
  name: 'Answer'
});
</script>
